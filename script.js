function updateScent(name, color, type) {
  // Update the liquid color
  const liquid = document.getElementById('liquid');
  liquid.style.height = '70%'; // Fill up the bottle
  liquid.style.backgroundColor = color;
  
  // Update the label text
  const label = document.getElementById('scent-name');
  label.innerText = name;
  
  // Show checkout area
  const checkout = document.getElementById('checkout-area');
  checkout.classList.remove('hidden');
  
  // Log for "Business Data"
  console.log("Customer selected: " + name + " (" + type + ")");
}
const questions = [
  { q: "How should your presence feel?", a: { "A clean whisper": "fresh", "A bold statement": "woody", "A warm embrace": "oriental", "A vibrant spark": "citrus" }},
  { q: "Choose a texture.", a: { "Crisp Linen": "fresh", "Heavy Velvet": "oriental", "Soft Suede": "woody", "Cool Silk": "floral" }},
  { q: "Your ideal environment?", a: { "Coastal Breeze": "fresh", "Library at Night": "woody", "Spiced Market": "oriental", "Botanical Garden": "floral" }},
  { q: "Preferred light?", a: { "High Noon": "citrus", "Twilight": "floral", "Candlelight": "oriental", "Dappled Shade": "woody" }},
  { q: "Which flavor resonates?", a: { "Sea Salt": "fresh", "Black Coffee": "woody", "Honey & Clove": "oriental", "Zesty Lime": "citrus" }},
  { q: "Pick a color palette.", a: { "Monochrome": "fresh", "Earth Tones": "woody", "Deep Jewels": "oriental", "Pastels": "floral" }},
  { q: "Your energy level?", a: { "Calm & Still": "fresh", "Focused": "woody", "Mysterious": "oriental", "High Energy": "citrus" }},
  { q: "Pick an element.", a: { "Running Water": "fresh", "Ancient Stone": "woody", "Flickering Fire": "oriental", "Spring Air": "floral" }},
  { q: "Your dream getaway?", a: { "Minimalist Loft": "fresh", "Mountain Cabin": "woody", "Parisian Suite": "floral", "Desert Oasis": "oriental" }},
  { q: "How do you want to feel?", a: { "Pure": "fresh", "Powerful": "woody", "Seductive": "oriental", "Happy": "citrus" }}
];

let currentStep = 0;
let scores = { fresh: 0, woody: 0, oriental: 0, citrus: 0, floral: 0 };

function initQuiz() {
  const q = questions[currentStep];
  document.getElementById('question-text').innerText = q.q;
  document.getElementById('progress-text').innerText = `Step ${currentStep + 1} of 10`;
  document.getElementById('progress-fill').style.width = `${(currentStep + 1) * 10}%`;
  
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  Object.entries(q.a).forEach(([text, vibe]) => {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.onclick = () => {
      scores[vibe]++;
      currentStep++;
      if (currentStep < questions.length) {
        initQuiz();
      } else {
        showResults();
      }
    };
    container.appendChild(btn);
  });
}

function showResults() {
  document.getElementById('question-section').classList.add('hidden');
  document.getElementById('result-section').classList.remove('hidden');
  
  const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  
  const database = {
    fresh: { 
      title: "Scent No. 101 | THE MINIMALIST", 
      explain: "Because you prefer clean textures and calm environments, we formulated a scent that mimics the air after rain.",
      notes: "Sea Salt • Aldehydes • White Musk" 
    },
    woody: { 
      title: "Scent No. 505 | THE ARCHITECT", 
      explain: "Your preference for focus and earth tones led us to a structured, grounded blend of ancient woods.",
      notes: "Sandalwood • Cedar • Raw Leather" 
    },
    oriental: { 
      title: "Scent No. 909 | THE MYSTIC", 
      explain: "Seeking mystery and candlelight, your scent is deep, resinous, and designed for late-night presence.",
      notes: "Amber • Spiced Oud • Vanilla" 
    },
    citrus: { 
      title: "Scent No. 202 | THE OPTIMIST", 
      explain: "Your high energy and love for sunlight required a sparkling, sharp profile that energizes the senses.",
      notes: "Bergamot • Yuzu • Pink Pepper" 
    },
    floral: { 
      title: "Scent No. 303 | THE DREAMER", 
      explain: "Drawn to botanical gardens and soft fabrics, your formula is a modern, airy floral that feels like spring.",
      notes: "Peony • Jasmine • White Tea" 
    }
  };

  document.getElementById('scent-title').innerText = database[winner].title;
  document.getElementById('scent-explanation').innerText = database[winner].explain;
  document.getElementById('scent-notes').innerText = database[winner].notes;
}

function orderNow() {
  const result = document.getElementById('scent-title').innerText;
  window.open(`https://wa.me/YOURPHONE?text=My Lab Result: ${result}. I want to order a sample!`);
}

// Start the quiz
initQuiz();