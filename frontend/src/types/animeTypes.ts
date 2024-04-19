// 타입 정의
export interface AnimeAttributes {
  abbreviatedTitles: string[];
  ageRating: string;
  ageRatingGuide: string;
  averageRating: string;
  canonicalTitle: string;
  posterImage: {
    small: string;
    large: string;
    original: string;
    tiny: string;
  }
}

export interface Anime {
  id: string;
  type: string;
  attributes: AnimeAttributes;
  relationships: any;  // 필요한 경우 relationships에 대한 더 상세한 타입 정의가 필요할 수 있습니다.
}

// Swiper 아이템을 위한 새로운 인터페이스 정의
export interface AnimeInfo {
  title: string;
  subtitle: string;
  rating: string;
  averageRating: string;
}