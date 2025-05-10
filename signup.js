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
