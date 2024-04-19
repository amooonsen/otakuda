interface SortableItem {
  attributes: {
    [key: string]: any;
  };
}

/**
 * 데이터 배열을 주어진 속성에 따라 정렬합니다.
 * @param items 정렬할 아이템 배열
 * @param key 정렬 기준 속성명
 * @param isAscending 오름차순으로 정렬할지 여부 (기본값: false, 내림차순)
 */
export function sortData(items: SortableItem[], key: string, isAscending: boolean = false): SortableItem[] {
  return items.sort((a, b) => {
    const valueA = a.attributes[key];
    const valueB = b.attributes[key];
    if (valueA < valueB) return isAscending ? -1 : 1;
    if (valueA > valueB) return isAscending ? 1 : -1;
    return 0;
  });
}