window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('termsPage').style.display = 'block';
      }, 3000);
    });

// フェードイン関係
    const featureItems = document.querySelectorAll('.feature-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  featureItems.forEach(item => {
    observer.observe(item);
  });
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginform');

    if (!loginForm) {
      console.error('loginFormが見つかりません');
      return;
    }

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('loginemail');
      const passwordInput = document.getElementById('loginpassword');

      if (!emailInput || !passwordInput) {
        console.error('メールアドレスまたはパスワード入力欄が見つかりません');
        return;
      }

      const loginEmail = emailInput.value.trim();
      const loginPassword = passwordInput.value;

      // ローカルストレージからユーザーデータを取得
      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      if (!storedUserData) {
        alert('登録されたユーザーが見つかりません。新規登録を行ってください。');
        return;
      }

      const { email, password } = storedUserData;

      if (loginEmail === email && loginPassword === password) {
        console.log('ログイン成功:', storedUserData);
        window.location.replace('QuickTrend.html');
      } else {
        alert('メールアドレスまたはパスワードが間違っています。');
      }
    });
  });
    document.addEventListener('DOMContentLoaded', () => {
  // ページ要素の取得
  const agreeCheckbox = document.getElementById('agreeCheckbox');
  const agreeButton = document.getElementById('agreeButton');
  const firstPage = document.getElementById('firstPage'); // ← 元の firstPage を修正
  const registrationPage = document.getElementById('registrationPage');
  const loginForm = document.getElementById('loginform');
  const registrationForm = document.getElementById('registrationForm');

  // チェックボックスの状態で「同意する」ボタンの有効化を切り替え
  agreeCheckbox?.addEventListener('change', () => {
    agreeButton.disabled = !agreeCheckbox.checked;
  });


  // 登録ページに移動する もし、会員登録やログインを別のhtmlに移行してやる場合TermPageを別のクラスへ変える　（新規ユーザ用）
        agreeButton.addEventListener('click', function() {
            firstPage.style.display = 'none';//ここのページから違う画面へと移動！（オブジェクト指向なし）
            registrationPage.style.display = 'block';
        });

  // 登録フォームの送信処理
  registrationForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // 入力されたユーザー情報を取得
    const name = document.getElementById('name')?.value || '';
    const age = document.getElementById('age')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const password = document.getElementById('password')?.value || '';

    // ユーザーデータをローカルストレージに保存
    const userData = { name, age, phone, email, password };
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('User Data saved:', userData);

    // QuickTrendのトップページに移動（リロードあり）
    window.location.replace('QuickTrend.html');
  });
});
 document.getElementById('genreForm').addEventListener('submit', function(e) {
            e.preventDefault();
             const selectedGenres = [];//ここから
            document.querySelectorAll('input[name="genre"]:checked').forEach(genre => {
                selectedGenres.push(genre.value);
            });
            console.log('Selected Genres:', selectedGenres);//ここまで
            genrePage.style.display = 'none';
            quicktrendPage.style.display = 'block';
        });//（ログイン用ここまで）
//titleについてのアニメーション
window.onload = function() {
  const titleElements = document.querySelectorAll('.title'); // 複数の要素に対応

  titleElements.forEach(titleElement => {
    const text = titleElement.textContent;
    titleElement.textContent = ''; // 元のテキストをクリア

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.animation = `fadeInUpChar 1.5s ease-out ${i * 0.1}s forwards`; // アニメーションと遅延
      titleElement.appendChild(span);
    }
  });
};

document.addEventListener('DOMContentLoaded', function() {
        const agreeCheckbox = document.getElementById('agreeCheckbox');
        const agreeButton = document.getElementById('agreeButton');
        const termsPage = document.getElementById('termsPage');
        const controlebar = document.getElementById('controlebar');//追加
        const registrationPage = document.getElementById('registrationPage');
        const genrePage = document.getElementById('genrePage');
        const genreListPage = document.getElementById('genreListPage');
        const postPage = document.getElementById('postPage');
        const postTitle = document.getElementById('postTitle');
        const postForm = document.getElementById('postForm');
        const postContent = document.getElementById('postContent');
        const postList = document.getElementById('postList');
       const loginForm = document.getElementById('loginform'); // 追加


        // ジャンルボタンをクリックすると該当ジャンルページを表示します
        document.querySelectorAll('.genreButton').forEach(button => {
            button.addEventListener('click', function() {
                const genre = this.dataset.genre;
                postTitle.textContent = `${genre} の投稿`;
                genreListPage.style.display = 'none';
                controlebar.style.display = 'none';//追加
                postPage.style.display = 'block';
                loadPosts(genre);  // 選択したジャンルの投稿を localStorage から読み込む
            });
        });

     //追加　postPage から genreListPage に移動できます         
  document.getElementById('backButton').addEventListener('click', function() {      
    document.getElementById('postPage').style.display = 'none';     
    document.getElementById('genreListPage').style.display = 'block'; 
    document.getElementById('controlebar').style.display = 'block';
  });
  
        
        // 投稿を処理する機能
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const content = postContent.value;
            const genre = postTitle.textContent.split(' ')[0];
            const timestamp = new Date().toLocaleString();
            const file = filebox.files[0]; // Correctly reference the file input

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64Data = e.target.result;
                    const post = { username, content, media: base64Data, timestamp };

                    // ローカルストレージに保存
                    let posts = JSON.parse(localStorage.getItem(genre)) || [];
                    posts.push(post);
                    localStorage.setItem(genre, JSON.stringify(posts));

                    // 投稿を表示する
                    displayPost(post);
                    postForm.reset(); // 投稿後にフォームをリセットする
                };
                reader.readAsDataURL(file); // ファイルをBase64に変換する
            } else {
                const post = { username, content, media: null, timestamp };
                let posts = JSON.parse(localStorage.getItem(genre)) || [];
                posts.push(post);
                localStorage.setItem(genre, JSON.stringify(posts));
                displayPost(post);
                postForm.reset(); // 投稿後にフォームをリセットする
            }
        });

        // 選択したジャンルの投稿を localStorage から読み込む
        function loadPosts(genre) {
            postList.innerHTML = '';
            const posts = JSON.parse(localStorage.getItem(genre)) || [];
            posts.forEach(post => displayPost(post));
        }

        // 投稿を表示する
        function displayPost(post) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${post.username}</strong> (${post.timestamp})<br>${post.content}`;

            // 投稿にメディアがある場合は、適切な要素を作成する
            if (post.media) {
                // プレフィックスに基づいてメディアが画像であるかビデオであるかを判断する
                const mediaType = post.media.startsWith('data:image/') ? 'image' : 'video';
                const mediaElement = document.createElement(mediaType === 'image' ? 'img' : 'video');
                
                if (mediaType === 'image') {
                    mediaElement.src = post.media; // Set image source
                    mediaElement.style.maxWidth = '200px'; // Set maximum width for the image
                } else {
                    mediaElement.controls = true; // Add controls for video
                    mediaElement.src = post.media; // Set video source
                }

                li.appendChild(mediaElement);
            }

            postList.appendChild(li);
        }
    });
