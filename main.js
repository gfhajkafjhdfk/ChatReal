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
