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
