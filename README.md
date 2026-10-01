# IDEA 사업단 랜딩 페이지

명지대학교 **인공지능 융합 디자인-엔지니어링 사업단(IDEA)** 원페이지 소개 사이트입니다.
콘텐츠 원본은 [ideamyongji.github.io](https://ideamyongji.github.io/)입니다.

- **사이트:** https://idea-landing-inky.vercel.app
- **저장소:** https://github.com/ideamyongji/idea-landing
- **스택:** Vite · React 19 · Motion (`motion/react`) · lucide-react · plain CSS (`src/index.css`)

## 로컬 개발

Node.js 20.19 이상(또는 22.12 이상)이 필요합니다.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 에 정적 빌드 생성
npm run preview  # 빌드 결과 미리보기
npm run lint     # oxlint
```

## 배포

Vercel 프로젝트 `idea-landing`(팀 `mju-idea`)이 이 GitHub 저장소와 연결되어 있어서, **push하면 자동으로 배포됩니다.**

| push 대상 | 결과 |
|---|---|
| `main` 브랜치 | 프로덕션 배포 → https://idea-landing-inky.vercel.app 갱신 |
| 그 외 브랜치 | 미리보기 배포 → 브랜치별 주소 생성, Pull Request에 링크 표시 |

Vercel이 직접 `npm run build`를 실행하고 `dist/`를 배포하므로 빌드 결과물을 커밋할 필요는 없습니다.

### 일반적인 흐름

```bash
# 1. 작업 브랜치에서 수정하고 미리보기로 확인
git switch -c update-news
git add -A
git commit -m "소식 업데이트"
git push -u origin update-news   # 미리보기 주소가 생성됩니다

# 2. 확인이 끝나면 main에 반영 (Pull Request 머지 또는 직접 merge 후 push)
git switch main
git merge update-news
git push                         # 프로덕션 사이트가 갱신됩니다
```

배포 상태와 로그는 [Vercel 대시보드](https://vercel.com/mju-idea/idea-landing)에서 확인할 수 있습니다.

### CLI로 직접 배포 (선택)

git을 거치지 않고 배포하려면 [Vercel CLI](https://vercel.com/docs/cli)를 사용합니다.

```bash
npm install -g vercel
vercel login
vercel link --scope mju-idea --project idea-landing   # 처음 한 번만
vercel deploy -y          # 미리보기 배포
vercel deploy --prod -y   # 프로덕션 배포
```

### 되돌리기

문제가 생긴 배포는 Vercel 대시보드의 **Deployments**에서 이전 배포를 골라 **Instant Rollback**하면 즉시 되돌릴 수 있습니다. CLI에서는 `vercel rollback`을 사용합니다.

## 계정과 권한

- **GitHub:** 저장소 소유 계정은 `ideamyongji`입니다. push 권한이 있는 계정으로 로그인해야 합니다.
- **Vercel:** 팀 `mju-idea`의 `idea-landing` 프로젝트입니다. GitHub 연결에는 ideamyongji 계정에 설치된 Vercel GitHub App 권한이 사용됩니다.

### 한 컴퓨터에서 여러 GitHub 계정을 쓰는 경우

다른 계정의 자격 증명이 저장되어 있으면 `git push`가 `403 Permission denied`로 실패할 수 있습니다. 이 저장소만 [GitHub CLI](https://cli.github.com/)의 ideamyongji 로그인을 쓰도록 설정하면 됩니다.

```bash
gh auth login    # ideamyongji 계정으로 로그인
git config --local credential.https://github.com.helper ""
git config --local --add credential.https://github.com.helper "!gh auth git-credential"
```

## 주의 사항

- `.env.local`(Vercel CLI가 만든 토큰), `.vercel/`, `node_modules/`, `dist/`는 커밋하지 않습니다(`.gitignore`). 토큰이나 비밀번호를 코드에 넣지 마세요.
- 갤러리 사진은 `ideamyongji.github.io`의 이미지를 직접 불러옵니다. 원본 사이트에서 사진 경로가 바뀌면 `src/components/Gallery.jsx`의 경로도 함께 바꿔야 합니다.
