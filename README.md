# AjouClub Frontend

아주대학교 동아리 정보 플랫폼 프론트엔드 프로젝트입니다.

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [API 연동](#api-연동)
- [빌드 및 배포](#빌드-및-배포)

## 🎯 프로젝트 소개

AjouClub은 아주대학교 학생들이 다양한 동아리 정보를 쉽게 탐색하고, 모집 공고를 확인하며, 자신에게 맞는 동아리를 찾을 수 있도록 도와주는 웹 플랫폼입니다.

### 주요 특징

- 🔍 동아리 및 모집 공고 검색 및 필터링
- 📝 동아리 관리자가 모집 공고 작성 및 수정
- 🎨 동아리 소개 및 활동 사진 관리
- 🧩 동아리 취향 진단 기능
- ❤️ 관심 모집 공고 즐겨찾기
- 🔐 Google OAuth 로그인

## 🛠 기술 스택

### Core
- **React** 19.1.1 - UI 라이브러리
- **TypeScript** 5.8.3 - 타입 안정성
- **Vite** 7.1.2 - 빌드 도구 및 개발 서버

### 상태 관리
- **Zustand** 5.0.8 - 전역 상태 관리 (인증 상태)
- **React Query** (@tanstack/react-query) 5.89.0 - 서버 상태 관리 및 캐싱

### 스타일링
- **Tailwind CSS** 4.1.13 - 유틸리티 기반 CSS 프레임워크
- **PostCSS** 8.5.6 - CSS 후처리

### 라우팅
- **React Router DOM** 7.9.0 - 클라이언트 사이드 라우팅

### HTTP 클라이언트
- **Axios** 1.12.2 - HTTP 요청 라이브러리

### 인증
- **@react-oauth/google** 0.12.2 - Google OAuth 인증

### 기타
- **React GA4** 2.1.0 - Google Analytics
- **SVGR** 4.5.0 - SVG를 React 컴포넌트로 변환

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd ajouClub

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 미리보기

```bash
# 빌드된 앱 미리보기
npm run preview
```

### 린팅

```bash
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── api/                    # API 호출 함수
│   ├── auth.ts            # 인증 관련 API
│   ├── club.ts            # 동아리 관련 API
│   ├── recruitment.ts     # 모집 공고 관련 API
│   └── user.ts            # 사용자 관련 API
│
├── assets/                 # 정적 자원
│   ├── icon/              # 아이콘 SVG 파일
│   └── img/               # 이미지 파일
│
├── components/             # 재사용 가능한 컴포넌트
│   ├── club-detail/       # 동아리 상세 페이지 컴포넌트
│   ├── common/            # 공통 컴포넌트
│   ├── homepage/          # 홈페이지 컴포넌트
│   ├── mypage/            # 마이페이지 컴포넌트
│   ├── recruit-detail/    # 모집 공고 상세 컴포넌트
│   └── ui/                # UI 컴포넌트 (Button, Chip, Field 등)
│
├── Hooks/                  # 커스텀 훅
│   ├── useClubDetails.ts
│   ├── useClubs.ts
│   ├── useMypageData.ts
│   └── ...
│
├── pages/                  # 페이지 컴포넌트
│   ├── admin/             # 관리자 전용 페이지
│   │   ├── ClubEditPage.tsx
│   │   ├── ClubIntroEditPage.tsx
│   │   ├── RecruitmentEditPage.tsx
│   │   └── RecruitmentWritePage.tsx
│   ├── ClubAssessmentPage.tsx
│   ├── ClubAssessmentResultPage.tsx
│   ├── ClubDetailPage.tsx
│   ├── ClubExplorePage.tsx
│   ├── Homepage.tsx
│   ├── loginPage.tsx
│   ├── MyPage.tsx
│   └── ...
│
├── stores/                 # 상태 관리 (Zustand)
│   └── useAuthStore.ts    # 인증 상태 관리
│
├── types/                  # TypeScript 타입 정의
│   ├── club.ts
│   ├── recruit.ts
│   └── user.ts
│
├── utils/                  # 유틸리티 함수
│   ├── axios.ts           # Axios 인스턴스 및 인터셉터
│   ├── date.ts            # 날짜 관련 유틸리티
│   └── jwtDecode.ts       # JWT 디코딩
│
├── App.tsx                 # 메인 앱 컴포넌트 (라우팅)
├── main.tsx                # 앱 진입점
└── index.css               # 전역 스타일
```

## ✨ 주요 기능

### 1. 동아리 탐색
- 카테고리별 동아리 필터링
- 검색 기능
- 정렬 옵션 (인기순, 최신순 등)

### 2. 모집 공고
- 모집 공고 목록 조회
- 상세 정보 확인
- 즐겨찾기 기능
- 필터링 및 검색

### 3. 동아리 관리 (관리자)
- 모집 공고 작성 및 수정
- 동아리 소개 수정
- 활동 사진 업로드/삭제 (최대 8장)
- 모집 공고 삭제

### 4. 동아리 취향 진단
- 5가지 질문을 통한 취향 진단
- 맞춤형 동아리 추천
- 추천 결과 기반 필터링된 동아리 탐색

### 5. 마이페이지
- 프로필 정보 확인
- 즐겨찾기한 모집 공고 목록
- 관리 중인 동아리 목록

### 6. 인증
- Google OAuth 로그인
- JWT 기반 인증
- 자동 토큰 갱신

## 🔌 API 연동

### Base URL
- 개발 환경: `https://ajouclubserver.shop` (프록시 설정)
- 프로덕션: `https://ajouclubserver.shop`

### 주요 API 엔드포인트

#### 인증
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `POST /api/auth/logout` - 로그아웃

#### 동아리
- `GET /api/clubs` - 동아리 목록 조회
- `GET /api/clubs/:clubId` - 동아리 상세 정보
- `PATCH /api/club/:clubId` - 동아리 소개 수정
- `POST /api/club/:clubId/activity-images` - 활동 사진 업로드
- `DELETE /api/club/:clubId/activity-images/one` - 활동 사진 삭제

#### 모집 공고
- `GET /api/recruitments` - 모집 공고 목록 조회
- `GET /api/recruitments/:recruitmentId` - 모집 공고 상세 정보
- `POST /api/recruitments/:clubId` - 모집 공고 생성
- `PATCH /api/recruitments/:recruitmentId` - 모집 공고 수정
- `DELETE /api/recruitments/:recruitmentId` - 모집 공고 삭제
- `POST /api/recruitments/:recruitmentId/images` - 모집 공고 이미지 업로드
- `POST /api/recruitments/:recruitmentId/images/by-url` - 모집 공고 이미지 교체
- `POST /api/recruitments/favorites/:recruitmentId` - 즐겨찾기 추가
- `DELETE /api/recruitments/favorites/:recruitmentId` - 즐겨찾기 삭제

#### 사용자
- `GET /api/user/me` - 현재 사용자 정보 조회
- `GET /api/user/clubs` - 관리 중인 동아리 목록
- `GET /api/user/favorites` - 즐겨찾기한 모집 공고 목록

### 인증 방식
- Access Token: HTTP 헤더에 `Authorization: Bearer {token}` 형식으로 전송
- Refresh Token: HttpOnly 쿠키로 관리
- 401 에러 발생 시 자동으로 토큰 갱신 시도

## 🏗 빌드 및 배포

### 빌드 설정

빌드 설정은 `vite.config.ts`에서 관리됩니다.

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://ajouclubserver.shop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### 배포

프로젝트는 GitHub Pages를 통해 배포됩니다.

1. 빌드 실행: `npm run build`
2. `dist` 폴더의 내용을 GitHub Pages에 배포

## 📝 개발 가이드

### 코드 스타일
- ESLint를 사용한 코드 품질 관리
- TypeScript strict 모드 활성화
- 함수형 컴포넌트 및 Hooks 사용

### 컴포넌트 작성 규칙
- 재사용 가능한 컴포넌트는 `components/` 폴더에 작성
- 페이지 컴포넌트는 `pages/` 폴더에 작성
- UI 컴포넌트는 `components/ui/` 폴더에 작성

### 상태 관리
- 전역 상태: Zustand (`stores/`)
- 서버 상태: React Query (`Hooks/`)
- 로컬 상태: `useState`, `useReducer`

### 스타일링
- Tailwind CSS 유틸리티 클래스 사용
- 커스텀 스타일은 `index.css`에 추가
- 반응형 디자인: 모바일 우선 접근

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 아주대학교 동아리 정보 플랫폼 프로젝트입니다.

## 👥 팀

아주대학교 AjouClub 개발팀

---

**문의사항이나 버그 리포트는 이슈로 등록해주세요.**
