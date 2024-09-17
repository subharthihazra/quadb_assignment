function fetchCryptoData() {
    fetch('/api/crypto-data')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            var tableBody = document.querySelector('#data_table_body');
            tableBody.innerHTML = ''; // Clear the existing table rows

            data.forEach(function(item, index) {
                var row = document.createElement('tr');
                row.innerHTML = 
                    '<td>' + (index + 1) + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>₹ ' + item.last + '</td>' +
                    '<td>₹ ' + item.buy + ' / ₹ ' + item.sell + '</td>' +
                    '<td>' + item.volume + '</td>' +
                    '<td>' + item.base_unit + '</td>';
                tableBody.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchCryptoData();
});