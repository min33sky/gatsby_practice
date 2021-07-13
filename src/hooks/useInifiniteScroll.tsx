import { PostType } from 'components/Main/PostList';
import { useEffect } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);

  const postListByCategory = useMemo(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  const observer = new IntersectionObserver((entries, observer) => {
    // ? 이번 코드는 하나의 요소만 관측한다
    if (!entries[0].isIntersecting) return;

    setCount(value => value + 1);
    observer.disconnect();
  });

  useEffect(() => setCount(1), [selectedCategory]);

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length || // 예) 80 > 73이면 더 불러올 필요가 없다
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return;

    observer.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, selectedCategory]); //? 카테고리 변경 시에도 호출한다.

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInifiniteScroll;
