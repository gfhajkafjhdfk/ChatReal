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
