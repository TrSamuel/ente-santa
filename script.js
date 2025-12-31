
const jsConfetti = new JSConfetti();
const map = L.map('map').setView([9.95, 76.31], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const sleighIcon = L.icon({
    iconUrl: '/asset/image/santa.gif',
    iconSize: [190, 130],
    iconAnchor: [65, 105]
});
const santa = L.marker([9.95, 76.31], { icon: sleighIcon }).addTo(map);

const provider = new GeoSearch.OpenStreetMapProvider();
const search = new GeoSearch.GeoSearchControl({
    provider: provider,
    style: 'bar',
    showMarker: false,
    autoClose: true,
    keepResult: true
});
map.addControl(search);

map.on('geosearch/showlocation', (result) => {
    document.getElementById('city').value = result.location.label;
});

let currentLat = 9.95;
let currentLng = 76.31;
let currentLocationName = "Brototype Hub Kochi 🏢";
let isFlying = false;
let travelInterval = null;
let countdownInterval = null;
let audio = null;
let step = 0;
let steps = 100;
let totalSeconds = 0;
let baseSpeed = 1000; // base magical speed
let currentSpeed = 0;
let currentTraffic = "clear";

const moods = ["Happy 😄", "Jolly 🎉", "Romantic ❤️", "Excited 🚀", "Tired 😴"];


const gifts = [
    { emoji: "🧸", text: "A Cuddly Teddy Bear Full of Hugs!" },
    { emoji: "🚲", text: "A Brand New Bicycle for Adventure Rides!" },
    { emoji: "🎮", text: "A Gaming Console with Unlimited Fun!" },
    { emoji: "📱", text: "A Shiny New Smartphone!" },
    { emoji: "💻", text: "A Powerful Laptop for Dreams & Code!" },
    { emoji: "🎧", text: "Noise-Cancelling Headphones!" },
    { emoji: "⌚", text: "A Smartwatch to Track Your Goals!" },
    { emoji: "📚", text: "A Stack of Magical Books!" },
    { emoji: "🖍️", text: "An Art Kit to Paint Your Imagination!" },
    { emoji: "🎹", text: "A Keyboard to Create Beautiful Music!" },

    { emoji: "⚽", text: "A Football Signed by Santa!" },
    { emoji: "🏀", text: "A Basketball with Infinite Bounce!" },
    { emoji: "🏏", text: "A Cricket Bat of Champions!" },
    { emoji: "🎾", text: "A Tennis Kit for Grand Slams!" },
    { emoji: "🥊", text: "Boxing Gloves of Strength & Courage!" },

    { emoji: "🧩", text: "A Mind-Bending Puzzle Set!" },
    { emoji: "♟️", text: "A Chess Board for Master Minds!" },
    { emoji: "🎲", text: "Board Games for Family Fun!" },
    { emoji: "🃏", text: "A Deck of Magical Playing Cards!" },

    { emoji: "🍫", text: "A Box of Delicious Chocolates!" },
    { emoji: "🍬", text: "Unlimited Candy & Sweets!" },
    { emoji: "🍕", text: "A Pizza Party Coupon!" },
    { emoji: "🍔", text: "A Burger Feast from Santa!" },
    { emoji: "🍩", text: "Donuts That Never End!" },

    { emoji: "👟", text: "Cool Sneakers for Fast Runs!" },
    { emoji: "🧥", text: "A Cozy Winter Jacket!" },
    { emoji: "🧢", text: "A Stylish Cap from Santa!" },
    { emoji: "🕶️", text: "Cool Sunglasses for Sunny Days!" },

    { emoji: "🧸", text: "A Talking Teddy Bear!" },
    { emoji: "🤖", text: "A Friendly Robot Buddy!" },
    { emoji: "🦄", text: "A Magical Unicorn Plush!" },
    { emoji: "🐶", text: "A Cute Puppy Plush!" },
    { emoji: "🐱", text: "A Soft Kitty Plush!" },

    { emoji: "🚗", text: "A Remote Control Car!" },
    { emoji: "🚁", text: "A Flying Helicopter Toy!" },
    { emoji: "🚀", text: "A Space Rocket Toy!" },
    { emoji: "🛸", text: "A UFO with Alien Sounds!" },

    { emoji: "🎨", text: "A Professional Painting Set!" },
    { emoji: "📸", text: "A Camera to Capture Memories!" },
    { emoji: "🎥", text: "A Vlogging Starter Kit!" },
    { emoji: "🎤", text: "A Microphone for Super Singing!" },

    { emoji: "💡", text: "A Box of Brilliant Ideas!" },
    { emoji: "✨", text: "Santa’s Lucky Star!" },
    { emoji: "🪄", text: "A Wand of Christmas Magic!" },
    { emoji: "🎁", text: "A Mystery Gift from Santa!" },

    { emoji: "❤️", text: "Lots of Love & Happiness!" },
    { emoji: "🌟", text: "A Star for Being Amazing!" },
    { emoji: "😊", text: "A Lifetime of Smiles!" },
    { emoji: "🎄", text: "Christmas Joy All Year Long!" },
    { emoji: "😄", text: "Endless Laughter & Fun!" },

    { emoji: "🏖️", text: "A Dream Vacation Ticket!" },
    { emoji: "✈️", text: "A World Travel Pass!" },
    { emoji: "🗺️", text: "An Adventure Map!" },

    { emoji: "📦", text: "A Surprise Box You Didn’t Expect!" },
    { emoji: "🔮", text: "A Crystal Ball of Good Luck!" },
    { emoji: "🪙", text: "A Coin of Infinite Fortune!" },
    { emoji: "👑", text: "A Crown for Being Special!" },
    { emoji: "🎖️", text: "A Medal for Being Awesome!" },
]
    ;

function addSantaMessage(msg) {
    const chatBox = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.className = 'chat-message';
    div.innerText = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function updateMood() {
    const moodMap = {
        clear: ["Happy 😄", "Jolly 🎉", "Excited 🚀"],
        moderate: ["Tired 😴", "Jolly 🎉"],
        heavy: ["Tired 😴", "Sad 😢", "Angry 😤"]
    };
    const possibleMoods = moodMap[currentTraffic] || ["Happy 😄"];
    currentMood = possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
    document.getElementById('mood').innerText = currentMood;
}

// High accuracy reverse geocoding for small places
async function updateCurrentRunningLocation(lat, lng) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`);
        const data = await res.json();
        let place = "the skies 🌌";
        if (data.address) {
            place = data.address.village || data.address.town || data.address.city || data.address.state || data.address.country || data.display_name.split(',')[0];
        }
        document.getElementById('location').innerText = `Flying over ${place}`;
    } catch (e) {
        document.getElementById('location').innerText = "Flying over the world 🌍";
    }
}

// Santa sends live location messages sometimes
async function sendLiveLocationMessage(lat, lng) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
        );
        const data = await res.json();

        let place =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state ||
            data.address?.country ||
            "the skies 🌌";

        const messages = [
            `Ho Ho Ho! I'm currently flying over ${place}! 🎅✈️`,
            `Santa update 🎄 — passing above ${place} right now! 🌍`,
            `Reindeer GPS 📍 says we’re over ${place}! 🦌`,
            `Wave up! Santa is flying above ${place}! 👋✨`
        ];

        addSantaMessage(
            messages[Math.floor(Math.random() * messages.length)]
        );
    } catch (e) {
        addSantaMessage("Ho Ho Ho! I'm flying somewhere magical in the sky! ✨");
    }
}


async function getCoords(city) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`);
    const data = await res.json();
    if (data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatETA(seconds) {
    if (seconds <= 0) return "";
    if (seconds < 60) return `${seconds} seconds`;
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins} minute${mins > 1 ? 's' : ''} ${seconds % 60} seconds`;
    const hours = Math.floor(mins / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins % 60} minute${mins % 60 > 1 ? 's' : ''}`;
}

async function deliverToMe() {
    if (isFlying) return alert("Santa is already flying!");

    if (countdownInterval) clearInterval(countdownInterval);
    if (travelInterval) clearInterval(travelInterval);
    if (audio) audio.pause();

    const city = document.getElementById('city').value.trim();
    if (!city) return alert("Please enter a place!");

    const target = await getCoords(city);
    if (!target) return alert("Place not found! Try a different name");

    let targetLat = target.lat;
    let targetLng = target.lng;
    let totalDistance = haversineDistance(currentLat, currentLng, targetLat, targetLng);
    totalSeconds = Math.max(30, Math.round((totalDistance / baseSpeed) * 3600));
    step = 0;
    steps = 100;

    isFlying = true;
    document.getElementById('progress').style.width = '0%';
    document.getElementById('progress').innerText = '0%';
    document.getElementById('etaDisplay').innerText = `ETA: ${formatETA(totalSeconds)} ⏰`;
    document.getElementById('location').innerText = `Flying to ${city}`;

    addSantaMessage(`Ho Ho Ho! Leaving ${currentLocationName} and heading to ${city}! Distance: ${Math.round(totalDistance)} km 🚀`);


    let remaining = totalSeconds;
    countdownInterval = setInterval(() => {
        remaining--;
        if (remaining > 0) {
            document.getElementById('etaDisplay').innerText = `ETA: ${formatETA(remaining)} ⏰`;
        }
    }, 1000);

    function travelStep() {
        if (!isFlying) return;

        step++;
        const progress = step / steps;
        const newLat = currentLat + (targetLat - currentLat) * progress;
        const newLng = currentLng + (targetLng - currentLng) * progress;
        santa.setLatLng([newLat, newLng]);
        map.panTo([newLat, newLng]);

        document.getElementById('progress').style.width = (progress * 100) + '%';
        document.getElementById('progress').innerText = Math.round(progress * 100) + '%';

        // Update live location every 10 steps
        if (step % 10 === 0) {
            updateCurrentRunningLocation(newLat, newLng);
        }
        // Sometimes send live location message in chat
        if (step % 20 === 0 && Math.random() < 0.5) {
            sendLiveLocationMessage(newLat, newLng);
        }


        // Change traffic every 30 steps
        if (step % 30 === 0) {
            const trafficTypes = ["clear", "moderate", "heavy"];
            currentTraffic = trafficTypes[Math.floor(Math.random() * trafficTypes.length)];
            let trafficText = currentTraffic === "clear" ? "Clear skies ahead!" : currentTraffic === "moderate" ? "Some cloud traffic" : "Heavy traffic – reindeer slowing down!";
            document.getElementById('trafficMsg').innerText = trafficText;
        }

        // Dynamic speed based on traffic
        if (currentTraffic === "clear") currentSpeed = 1000;
        else if (currentTraffic === "moderate") currentSpeed = 700;
        else currentSpeed = 500;

        document.getElementById('speed').innerText = currentSpeed;

        // RPM based on speed
        const rpm = Math.round(currentSpeed * 8 + Math.random() * 2000);
        document.getElementById('rpm').innerText = rpm;

        updateMood();

        if (step % 25 === 0) {
            let msg = "";
            if (currentMood.includes("Happy") || currentMood.includes("Jolly") || currentMood.includes("Excited")) {
                msg = ["Ho Ho Ho! Flying smoothly at " + currentSpeed + " km/h!", "The view is beautiful from up here!", "Reindeer are full of energy today!"][Math.floor(Math.random() * 3)];
            } else if (currentMood.includes("Romantic")) {
                msg = ["The stars are shining so brightly tonight ❤️", "Christmas magic is in the air... so romantic!", "Flying under the moonlight feels special ❤️"];
            } else if (currentMood.includes("Tired")) {
                msg = ["Getting a bit tired... long journey today 😴", "Reindeer need a quick rest soon", "Still flying, but slower now..."];
            } else if (currentMood.includes("Sad")) {
                msg = ["Feeling a little down... missing the North Pole 😢", "Hope this delivery cheers me up"];
            } else if (currentMood.includes("Angry")) {
                msg = ["These clouds are in the way – grrr! 😤", "Move aside, traffic! I have gifts to deliver!", "Not happy with this delay... hmph!"];
            }
            addSantaMessage(msg);
        }

        if (step < steps) {
            travelInterval = setTimeout(travelStep, (totalSeconds * 1000) / steps);
        } else {
            currentLat = targetLat;
            currentLng = targetLng;
            currentLocationName = city;
            document.getElementById('location').innerText = city;
            document.getElementById('etaDisplay').innerText = "Arrived! 🎅";

            addSantaMessage("Ho Ho Ho! I've arrived in " + city + "! Merry Christmas!!! 🎄❤️");

            const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
            document.getElementById('giftemoji').innerText = randomGift.emoji;
            document.getElementById('gifttext').innerText = randomGift.text;
            document.getElementById('usercity').innerText = city;

            jsConfetti.addConfetti({ emojis: ['❤️', '🧸', '🚲', '🎮', '🌹', '😂'], confettiNumber: 1500 });

            document.getElementById('surprise').style.display = 'block';
            setTimeout(() => {
                document.getElementById('surprise').style.display = 'none';
                document.getElementById('etaDisplay').innerText = "Delivered! 🎁";
            }, 7000);

            if (audio) audio.pause();
            isFlying = false;
        }
    }

    travelStep();
}

// Snowfall
const canvas = document.getElementById('snow');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const snowflakes = Array(350).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 2 + 1
}));

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.beginPath();
    snowflakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        f.y += f.d;
        if (f.y > canvas.height) f.y = -10;
        f.x += Math.sin(f.y / 40) * 0.6;
    });
    ctx.fill();
    requestAnimationFrame(drawSnow);
}
drawSnow();


 const song = document.getElementById('song');

  function playMusic() {
    song.volume = 0.4;
    song.play().catch(() => {});
    
    // Remove listeners after first play
    document.removeEventListener('click', playMusic);
    document.removeEventListener('keydown', playMusic);
  }

  document.addEventListener('click', playMusic);
  document.addEventListener('keydown', playMusic);
