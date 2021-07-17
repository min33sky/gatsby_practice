import { PostType } from 'components/Main/PostList';
import { MutableRefObject, RefObject, useEffect } from 'react';
import { useMemo } from 'react';
import { useRef, useState } from 'react';

export type useInfinityScrollType = {
  containerRef: React.RefObject<HTMLDivElement>;
  postList: PostType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInifiniteScroll = (
  selectedCategory: string,
  posts: PostType[],
): useInfinityScrollType => {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);

  const [count, setCount] = useState(1);

  const postListByCategory = useMemo<PostType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  useEffect(() => {
    /**
     *? useEffect에서 observer에 값을 대입하는 이유:
     *? Server-side-rendering에서  IntersectionObserver는
     *? 브라우저 API이기 때문에 null 값으로 인한 에러가 발생한다.
     *? Gatsby는 빌드시에 Node.js환경에서 진행되므로 브라우저 API를 사용할 수 없다.
     */
    observer.current = new IntersectionObserver((entries, observer) => {
      // ? 이번 코드는 하나의 요소만 관측한다
      if (!entries[0].isIntersecting) return;

      setCount(value => value + 1);
      // ? 현재 관측중인 객체의 관측 중지
      observer.unobserve(entries[0].target);
    });
  }, []);

  useEffect(() => setCount(1), [selectedCategory]);

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length || // 예) 80 > 73이면 더 불러올 필요가 없다
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    )
      return;

    observer.current.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, selectedCategory]); //? 카테고리 변경 시에도 호출한다.

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInifiniteScroll;
