import type { Faq } from './types';

export const faqs: Faq[] = [
  {
    question: '무료체험은 예약해야 하나요?',
    answer: '원활한 제품 안내를 위해 전화·문자 또는 네이버 플레이스로 방문 전에 문의해 주세요.',
    category: '체험',
    isPublished: true,
  },
  {
    question: '체험 비용이 있나요?',
    answer: '진주경상센터와 남강센터의 제품 체험은 무료로 안내하고 있습니다.',
    category: '체험',
    isPublished: true,
  },
  {
    question: '체험 시간은 얼마나 걸리나요?',
    answer: '방문 인원과 체험 제품에 따라 소요 시간이 달라질 수 있습니다.',
    category: '체험',
    isPublished: true,
  },
  {
    question: '부모님과 함께 방문해도 되나요?',
    answer: '네. 실제 사용하실 분과 함께 방문해 제품별 사용감과 크기를 비교해 보시는 것을 권합니다.',
    category: '체험',
    isPublished: true,
  },
  {
    question: '어떤 제품을 체험할 수 있나요?',
    answer: '',
    category: '제품',
    isPublished: false,
  },
  {
    question: '침대형과 쇼파형은 무엇이 다른가요?',
    answer: '형태와 설치 공간, 일상에서 사용하는 방식이 다릅니다. 센터에서 두 유형을 비교해 보세요.',
    category: '제품',
    isPublished: true,
  },
  {
    question: '1인용과 2인용 제품을 비교할 수 있나요?',
    answer: '',
    category: '제품',
    isPublished: false,
  },
  {
    question: '설치 공간은 어느 정도 필요한가요?',
    answer: '필요 공간은 모델과 프레임 구성에 따라 다릅니다. 설치할 장소의 가로·세로 크기를 확인해 오시면 상담에 도움이 됩니다.',
    category: '구매·설치',
    isPublished: true,
  },
  {
    question: '제품 가격은 어디서 확인하나요?',
    answer: '제품과 선택 사양에 따른 최신 정보는 센터 상담 시 확인해 주세요.',
    category: '구매·설치',
    isPublished: true,
  },
  {
    question: '렌탈 상담도 가능한가요?',
    answer: '',
    category: '구매·설치',
    isPublished: false,
  },
  {
    question: '배송과 설치는 어떻게 진행되나요?',
    answer: '',
    category: '구매·설치',
    isPublished: false,
  },
  {
    question: '주차가 가능한가요?',
    answer: '',
    category: '센터',
    isPublished: false,
  },
  {
    question: '의료기기 인증은 어디에서 확인할 수 있나요?',
    answer: '홈페이지의 기술과 인증 및 인증·허가 페이지에서 공개 가능한 자료와 적용 범위를 확인할 수 있습니다.',
    category: '인증·안전',
    isPublished: true,
  },
  {
    question: '사용 시 주의사항은 무엇인가요?',
    answer: '제품별 공식 사용설명서의 주의사항을 따르고, 센터에서 올바른 사용 방법을 안내받아 주세요.',
    category: '인증·안전',
    isPublished: true,
  },
  {
    question: 'A/S는 어떻게 접수하나요?',
    answer: '',
    category: '구매·설치',
    isPublished: false,
  },
];

export const publishedFaqs = faqs.filter((faq) => faq.isPublished && faq.answer);
