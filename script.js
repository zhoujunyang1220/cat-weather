const apiKey = "c30bd5da0b7c9272f44ddf4fc3eabed8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=zh_cn";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const mainCat = document.getElementById("main-cat");
const chatBubble = document.getElementById("chat-bubble");

// ✅ 映射本地 images 文件夹中的图片
const catGallery = {
    "Clear": "images/sunny.png",
    "Clouds": "images/cloudy.png",
    "Rain": "images/rainy.png",
    "Drizzle": "images/rainy.png",
    "Snow": "images/snowy.png",
    "Thunderstorm": "images/error.png",
    "Fog": "images/cloudy.png",
    "Mist": "images/cloudy.png",
    "Error": "images/error.png"
};

const catMessages = {
    "Clear": "太阳公公出来啦，快去晒肚皮喵！",
    "Clouds": "阴天啦，适合窝在家里踩奶喵~",
    "Rain": "下雨讨厌喵！爪子会湿掉的...",
    "Snow": "哇！是雪喵！白色的毛线球？",
    "Thunderstorm": "打雷好可怕！躲进被窝喵！",
    "Error": "喵？没听说过这个城市呀..."
};

async function checkWeather(city) {
    if (!city.trim()) return;

    chatBubble.innerText = "正在用肉垫拨打气象局...";

    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            mainCat.src = catGallery["Error"];
            chatBubble.innerText = catMessages["Error"];
            return;
        }

        // ✅ 更新天气数据 (修复了 feels_like 的读取位置)
        document.getElementById("city-display").innerText = data.name;
        document.getElementById("temp-display").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + "m/s";
        document.getElementById("pressure").innerText = data.main.pressure + "hPa";
        document.getElementById("feels-like").innerText = Math.round(data.main.feels_like) + "°C";
        document.getElementById("desc-display").innerText = data.weather[0].description;

        // ✅ 切换本地小猫变装
        const weatherMain = data.weather[0].main;
        mainCat.src = catGallery[weatherMain] || catGallery["Clouds"];
        chatBubble.innerText = catMessages[weatherMain] || "今天天气挺特别喵~";

        // 更新 OpenWeather 官方图标
        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    } catch (err) {
        chatBubble.innerText = "网络被猫咬断了喵！";
    }
}

// 按钮搜索
searchBtn.addEventListener("click", () => checkWeather(cityInput.value));

// 回车搜索
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkWeather(cityInput.value);
});

// 猫咪点击动画
mainCat.addEventListener("click", () => {
    mainCat.style.transform = "rotate(360deg) scale(1.3)";
    setTimeout(() => {
        mainCat.style.transform = "rotate(0deg) scale(1)";
    }, 600);
});