window.addEventListener('DOMContentLoaded', () => {
  // --- 初期画面の読み込み遅延処理 ---
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('termsPage').style.display = 'block';
  }, 3000);

  // --- 要素取得 ---
  const agreeCheckbox = document.getElementById('agreeCheckbox');
  const agreeButton = document.getElementById('agreeButton');
  const firstPage = document.getElementById('firstPage');
  const registrationPage = document.getElementById('registrationPage');
  const termsPage = document.getElementById('termsPage');
  const genrePage = document.getElementById('genrePage');
  const genreListPage = document.getElementById('genreListPage');
  const postPage = document.getElementById('postPage');
  const controlebar = document.getElementById('controlebar');
  const postTitle = document.getElementById('postTitle');
  const postForm = document.getElementById('postForm');
  const postContent = document.getElementById('postContent');
  const postList = document.getElementById('postList');
  const loginForm = document.getElementById('loginform');
  const registrationForm = document.getElementById('registrationForm');

  // --- アニメーション（タイトル） ---
  const titleElements = document.querySelectorAll('.title');
  titleElements.forEach(titleElement => {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.animation = `fadeInUpChar 1.5s ease-out ${i * 0.1}s forwards`;
      titleElement.appendChild(span);
    }
  });

  // --- アニメーション（スクロールでフェードイン） ---
  const featureItems = document.querySelectorAll('.feature-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });
  featureItems.forEach(item => observer.observe(item));

  // --- 利用規約同意チェック ---
  agreeCheckbox?.addEventListener('change', () => {
    agreeButton.disabled = !agreeCheckbox.checked;
  });

  agreeButton?.addEventListener('click', () => {
    firstPage.style.display = 'none';
    registrationPage.style.display = 'block';
  });

  // --- 新規登録 ---
  registrationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {
      name: document.getElementById('name')?.value || '',
      age: document.getElementById('age')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      email: document.getElementById('email')?.value || '',
      password: document.getElementById('password')?.value || ''
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.replace('QuickTrend.html');
  });

  // --- ログイン処理 ---
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const loginEmail = document.getElementById('loginemail')?.value.trim();
      const loginPassword = document.getElementById('loginpassword')?.value;
      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      if (!storedUserData) {
        alert('登録されたユーザーが見つかりません。新規登録を行ってください。');
        return;
      }

      const { email, password } = storedUserData;
      if (loginEmail === email && loginPassword === password) {
        window.location.replace('QuickTrend.html');
      } else {
        alert('メールアドレスまたはパスワードが間違っています。');
      }
    });
  }

  // --- ジャンル選択後の遷移 ---
  document.getElementById('genreForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedGenres = [];
    document.querySelectorAll('input[name="genre"]:checked').forEach(genre => {
      selectedGenres.push(genre.value);
    });
    console.log('Selected Genres:', selectedGenres);
    genrePage.style.display = 'none';
    document.getElementById('quicktrendPage').style.display = 'block';
  });

  // --- ジャンルボタンをクリックで投稿画面へ ---
  document.querySelectorAll('.genreButton').forEach(button => {
    button.addEventListener('click', function () {
      const genre = this.dataset.genre;
      postTitle.textContent = `${genre} の投稿`;
      genreListPage.style.display = 'none';
      controlebar.style.display = 'none';
      postPage.style.display = 'block';
      loadPosts(genre);
    });
  });

  // --- 戻るボタンで投稿一覧に戻る ---
  document.getElementById('backButton')?.addEventListener('click', () => {
    postPage.style.display = 'none';
    genreListPage.style.display = 'block';
    controlebar.style.display = 'block';
  });

  // --- 投稿処理 ---
  postForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const content = postContent.value;
    const genre = postTitle.textContent.split(' ')[0];
    const timestamp = new Date().toLocaleString();
    const file = document.getElementById('filebox')?.files[0];

    const handlePost = (media) => {
      const post = { username, content, media, timestamp };
      const posts = JSON.parse(localStorage.getItem(genre)) || [];
      posts.push(post);
      localStorage.setItem(genre, JSON.stringify(posts));
      displayPost(post);
      postForm.reset();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = e => handlePost(e.target.result);
      reader.readAsDataURL(file);
    } else {
      handlePost(null);
    }
  });

  // --- 投稿読み込み ---
  function loadPosts(genre) {
    postList.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem(genre)) || [];
    posts.forEach(post => displayPost(post));
  }

  // --- 投稿表示 ---
  function displayPost(post) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${post.username}</strong> (${post.timestamp})<br>${post.content}`;

    if (post.media) {
      const isImage = post.media.startsWith('data:image/');
      const mediaElement = document.createElement(isImage ? 'img' : 'video');
      mediaElement.src = post.media;
      if (isImage) {
        mediaElement.style.maxWidth = '200px';
      } else {
        mediaElement.controls = true;
      }
      li.appendChild(mediaElement);
    }

    postList.appendChild(li);
  }
});
