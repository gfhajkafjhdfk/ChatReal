window.addEventListener('DOMContentLoaded', () => {
  // ローディング → 利用規約ページ
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const termsPage = document.getElementById('termsPage');
    if (loadingScreen && termsPage) {
      loadingScreen.style.display = 'none';
      termsPage.style.display = 'block';
    }
  }, 3000);

  // タイトル文字アニメーション
  document.querySelectorAll('.title').forEach(titleElement => {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.animation = `fadeInUpChar 1.5s ease-out ${i * 0.1}s forwards`;
      titleElement.appendChild(span);
    }
  });

  // 利用規約同意チェック
  const agreeCheckbox = document.getElementById('agreeCheckbox');
  const agreeButton = document.getElementById('agreeButton');
  const termsPage = document.getElementById('termsPage');
  const registrationPage = document.getElementById('registrationPage');

  if (agreeCheckbox && agreeButton) {
    agreeCheckbox.addEventListener('change', () => {
      agreeButton.disabled = !agreeCheckbox.checked;
    });

    agreeButton.addEventListener('click', () => {
      if (termsPage && registrationPage) {
        termsPage.style.display = 'none';
        registrationPage.style.display = 'block';
      }
    });
  }

  // 新規登録処理
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value;
      const age = document.getElementById('age')?.value;
      const phone = document.getElementById('phone')?.value;
      const email = document.getElementById('email')?.value;
      const password = document.getElementById('password')?.value;

      if (name && age && phone && email && password) {
        const userData = { name, age, phone, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.replace('QuickTrend.html');
      } else {
        alert('すべての項目を入力してください');
      }
    });
  }

  // ログイン処理
  const loginForm = document.getElementById('loginform');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginEmail = document.getElementById('loginemail')?.value;
      const loginPassword = document.getElementById('loginpassword')?.value;
      const storedUser = JSON.parse(localStorage.getItem('userData'));

      if (!storedUser) {
        alert('登録されたユーザーが見つかりません。');
        return;
      }

      if (storedUser.email === loginEmail && storedUser.password === loginPassword) {
        window.location.replace('QuickTrend.html');
      } else {
        alert('メールアドレスまたはパスワードが違います');
      }
    });
  }

  // 投稿機能（QuickTrend.html内）
  const postForm = document.getElementById('postForm');
  const postList = document.getElementById('postList');

  // 投稿読み込み
  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    postList.innerHTML = '';
    posts.forEach((post, index) => {
      const postItem = document.createElement('div');
      postItem.className = 'post-item';

      const textEl = document.createElement('p');
      textEl.textContent = post.text;
      postItem.appendChild(textEl);

      if (post.image) {
        const imgEl = document.createElement('img');
        imgEl.src = post.image;
        imgEl.style.maxWidth = '200px';
        postItem.appendChild(imgEl);
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '削除';
      deleteBtn.addEventListener('click', () => {
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
      });
      postItem.appendChild(deleteBtn);

      postList.appendChild(postItem);
    });
  }

  // 投稿処理
  if (postForm) {
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const textInput = document.getElementById('postText');
      const imageInput = document.getElementById('postImage');
      const text = textInput?.value;
      const imageFile = imageInput?.files[0];

      if (!text && !imageFile) {
        alert('投稿内容が空です');
        return;
      }

      let imageBase64 = '';
      if (imageFile) {
        imageBase64 = await toBase64(imageFile);
      }

      const newPost = { text, image: imageBase64 };
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.unshift(newPost);
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();

      // フォームリセット
      textInput.value = '';
      imageInput.value = '';
    });
    loadPosts();
  }

  // 画像をBase64へ変換
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = e => reject(e);
      reader.readAsDataURL(file);
    });
  }
});
