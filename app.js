const form = document.querySelector('#generate-form');
const qrcode = document.querySelector('#qrcode');
const spinner = document.querySelector('#loading');
const generated = document.querySelector('#generated');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetHtml();

    const url = document.querySelector('#url').value;
    const size = document.querySelector('#size').value;

    if (url === '') {
        alert('Please enter a valid URL');
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateQrCode(url, size);
            setTimeout(() => {
                const saveUrl = qrcode.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);



    }

});


function hideSpinner() {
    spinner.style.display = 'none';
}

function showSpinner() {
    spinner.style.display = 'block';
}

const generateQrCode = (url, size) => {
    const qrCode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",


    })

}

const createSaveBtn = (saveUrl) => {

    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5 ';
    link.setAttribute('href', saveUrl);
    link.download = 'qrcode';
    link.textContent = 'Save QR Code';
    generated.appendChild(link);


}

const resetHtml = () => {
    qrcode.innerHTML = '';
    const saveLink = document.querySelector('#save-link');
    if (saveLink) {
        saveLink.remove();
    }


}

hideSpinner();
