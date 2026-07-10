import type { Certification } from './types';

export const certifications: Certification[] = [
  {
    id: 'manufacturer-license-228',
    title: '의료기기 제조업 허가',
    category: '제조업 허가',
    number: '제228호',
    issuer: null,
    issuedAt: null,
    appliesTo: '제조사 주식회사 쓰리에이치의 의료기기 제조업 허가',
    applicableModels: [],
    description:
      '주식회사 쓰리에이치가 의료기기 제조업 허가를 받은 업체임을 확인하는 자료입니다. 개별 제품의 품목 인증과는 구분됩니다.',
    image: null,
    imagePublic: false,
    personalDataMasked: false,
    officialSourceUrl: null,
    isPublished: true,
  },
  {
    id: 'item-certification-19-4214',
    title: '개인용 온열기 품목 인증',
    category: '제품 품목 인증',
    number: '제인 19-4214호',
    issuer: '한국의료기기안전정보원',
    issuedAt: '2019-03-22',
    appliesTo: '개인용 온열기 품목 및 인증서에 기재된 모델',
    applicableModels: ['3H22M-1'],
    description:
      '의료기기 2등급 개인용 온열기 품목의 특정 모델에 관한 인증 자료입니다. 모든 3H 제품에 공통 적용되는 인증으로 표시하지 않습니다.',
    image: null,
    imagePublic: false,
    personalDataMasked: false,
    officialSourceUrl: null,
    isPublished: true,
  },
];

export const publishedCertifications = certifications.filter((item) => item.isPublished);
