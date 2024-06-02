function queryPlayer() {
    const playerId = document.getElementById('playerId').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '查询中...';

    fetch(`https://webpay-api.battleofballs.com/api/player/${playerId}`)
        .then(response => response.json())
        .then(data => {
            if (data.code === -1) {
                resultDiv.innerHTML = '查询失败：用户不存在或ID被官方保护';
            } else if (data.code === 0) {
                const name = data.data.name;
                const qqid = data.data.qqid;
                const uid = data.data.uid;
                resultDiv.innerHTML = `
                    <p>中文ID: ${name}</p>
                    <p>数字ID: ${qqid}</p>
                    <p>全服排名: ${uid}</p>
                `;
            } else {
                resultDiv.innerHTML = '查询失败：未知错误';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '查询失败：网络错误或服务器无响应';
        });
}
