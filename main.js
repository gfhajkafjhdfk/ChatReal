// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWAmPErLz-geluBo3nfuZcNQJTVNjbmTA",
  authDomain: "chatreal-3e4fc.firebaseapp.com",
  projectId: "chatreal-3e4fc",
  storageBucket: "chatreal-3e4fc.firebasestorage.app",
  messagingSenderId: "466672622579",
  appId: "1:466672622579:web:9955b3f8195fceb5ced086",
  measurementId: "G-LRTRDE7ZB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('termsPage').style.display = 'block';
    }, 3000);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      const agreeCheckbox = document.getElementById('agreeCheckbox');
      const agreeButton = document.getElementById('agreeButton');
      const termsPage = document.getElementById('termsPage');
      const registrationPage = document.getElementById('registrationPage');
      const genrePage = document.getElementById('genrePage');
      const genreListPage = document.getElementById('genreListPage');
      const postPage = document.getElementById('postPage');
      const postTitle = document.getElementById('postTitle');
      const postForm = document.getElementById('postForm');
      const postContent = document.getElementById('postContent');
      const postList = document.getElementById('postList');
     const loginForm = document.getElementById('loginform'); // 追加

      
      // チェックボックスにチェックを入れると「同意する」ボタンが有効になる
      agreeCheckbox.addEventListener('change', function() {
          agreeButton.disabled = !agreeCheckbox.checked;
      });
     
      // 登録ページに移動する
      agreeButton.addEventListener('click', function() {
          termsPage.style.display = 'none';
          registrationPage.style.display = 'block';
      });

      // ユーザー情報を取得してジャンルページに移動する
      document.getElementById('registrationForm').addEventListener('submit', function(e) {
          e.preventDefault();
          const name = document.getElementById('name').value;//ここから
          const age = document.getElementById('age').value;
          const phone = document.getElementById('phone').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          // ユーザーデータをオブジェクトとして保存
          const userData = { name, age, phone, email, password };

          // ローカルストレージにユーザーデータを保存
          localStorage.setItem('userData', JSON.stringify(userData));
          console.log('User Data saved:', userData);//ここまで

          registrationPage.style.display = 'none';
          genrePage.style.display = 'block';
      });
      
// ログインフォームの送信 ここから
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const loginEmail = document.getElementById('loginemail').value;
          const loginPassword = document.getElementById('loginpassword').value;

          // ローカルストレージからユーザーデータを取得
          const storedUserData = JSON.parse(localStorage.getItem('userData'));

          // ログイン情報を確認
          if (storedUserData && storedUserData.email === loginEmail && storedUserData.password === loginPassword) {
              console.log('ログイン成功:', storedUserData);
              termsPage.style.display = 'none';
              genrePage.style.display = 'block';
          } else {
              alert('メールアドレスまたはパスワードが間違っています。');
          }
      });//add
      
      //ジャンル選択をキャプチャし、ジャンルリストページに移動する
      document.getElementById('genreForm').addEventListener('submit', function(e) {
          e.preventDefault();
           const selectedGenres = [];//ここから
          document.querySelectorAll('input[name="genre"]:checked').forEach(genre => {
              selectedGenres.push(genre.value);
          });
          console.log('Selected Genres:', selectedGenres);//ここまで
          genrePage.style.display = 'none';
          genreListPage.style.display = 'block';
      });

      // ジャンルボタンをクリックすると該当ジャンルページを表示します
      document.querySelectorAll('.genreButton').forEach(button => {
          button.addEventListener('click', function() {
              const genre = this.dataset.genre;
              postTitle.textContent = `${genre} の投稿`;
              genreListPage.style.display = 'none';
              postPage.style.display = 'block';
              loadPosts(genre);  // 選択したジャンルの投稿を localStorage から読み込む
          });
      });

      //追加　postPage から genreListPage に移動できます
      document.getElementById('backButton').addEventListener('click', function() { 
  document.getElementById('postPage').style.display = 'none';
  document.getElementById('genreListPage').style.display = 'block';
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