//ジャンル選択をキャプチャし、ジャンルリストページに移動する（ログイン用）

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
