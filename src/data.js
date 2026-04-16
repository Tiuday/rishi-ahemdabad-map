export const WEST_AREAS = [
  "100 Feet Road", "Adalaj", "Ambawadi", "Ambli Road", "Ambli Bopal Road",
  "Ambli", "Ashram Road", "Bavla", "Bhuyangdev", "Bodakdev", "Bhadaj",
  "Bhat", "Bopal", "CG Road", "New CG Road", "Chanakyapuri", "Chandkheda",
  "Chandlodia", "Changodar", "Dholera", "Drive In Road", "Ellisbridge",
  "Gandhinagar", "Ghatlodiya", "Ghatlodia", "Ghuma", "Gota", "Gulbai Tekra",
  "Gurukul", "Hebatpur", "Hebatpur Village", "Iscon Ambli Road", "Jagatpur",
  "Jagatpur Village", "Jivrajpark", "Jodhpur", "Jodhpur Village",
  "Juhapura", "Kalol", "Koba Gandhinagar", "Koba Ahmedabad", "Koteshwar",
  "Law Garden", "Makarba", "Makarba Road", "Manekbaug", "Moraiya", "Manipur",
  "Memnagar", "Mithakhali", "Motera", "Nana Chiloda", "Naranpura",
  "Navrangpura", "Nehru Nagar", "Nirnay Nagar", "New Ranip", "Nava Vadaj",
  "Pethapur", "Paldi", "Paldi Gaam", "Prahladnagar", "Prahlad nagar Extension",
  "Ramdevnagar", "Ranip", "Vijay Cross Road", "SP Ring Road", "Sabarmati",
  "Sanand", "Sanathal", "Santej", "Sarkhej", "Satadhar", "Satellite",
  "Satellite Road", "Science City Road", "Science City", "SG Road",
  "Shahibaug", "Shastrinagar", "Shela", "Shilaj", "Shivranjani", "Shantipura", "Shyamal",
  "Shyamal Cross Road", "Sindhubhavan Road", "Sola Over Bridge", "Sola Road",
  "Sola Village", "Sola", "South Bopal", "Subhash Bridge", "Thaltej",
  "Thaltej Shilaj Road", "Thol", "Usmanpura", "Ujala Circle", "Vavol", "Vadaj",
  "Vaishno devi Circle", "Vaishnodevi", "Vastrapur", "Vasna", "Vejalpur",
  "Rancharda", "Palodia", "Zundal", "Tragad", "Chekhla", "Ognaj"
];

export const EAST_AREAS = [
  "Airport Road", "Amraiwadi", "Arbudanagar", "Asarwa", "Aslali", "Bapunagar",
  "Behrampura", "Bhadra", "Bhatt", "Odhav", "Dani Limda", "Dariyapur",
  "Dehgam", "Enasan", "Gita Mandir", "Geratpur", "Gheekanta", "Ghodasar",
  "Girdhar nagar", "Gomtipur", "Hansol", "Hanspura", "Hatkeshwar", "Hathijan",
  "Hirawadi", "Isanpur", "Jamalpur", "Jashoda nagar", "Jasodanagr", "Kalupur", "Kankaria",
  "Kathwada", "Khadia", "Khokhra", "Krishnanagar", "Kubernagar", "Keshav Nagar",
  "Lal Darwaja", "Lambha", "Mahadev Nagar", "Maninagar", "Meghani Nagar", "Memco", "Narol",
  "Naroda", "New Maninagar", "New Narol", "Nava Naroda", "Nikol", "Raipur",
  "Rakhial", "Ramol", "Saijpur Bogha", "Sarangpur", "Sardarnagar", "Shah E Alam",
  "Shahpur", "Singarva", "Saraspur", "Thakkarbapa Nagar", "Vinzol", "Vastral",
  "Vatva", "Viratnagar"
];

// Deterministic seeded random
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const nodes = [];
let seed = 1;

WEST_AREAS.forEach((area, index) => {
  nodes.push({
    id: `W_${index}`,
    name: area,
    region: 'west',
    x: 50 + seededRandom(seed++) * 470,
    y: 50 + seededRandom(seed++) * 700,
  });
});

EAST_AREAS.forEach((area, index) => {
  nodes.push({
    id: `E_${index}`,
    name: area,
    region: 'east',
    x: 680 + seededRandom(seed++) * 470,
    y: 50 + seededRandom(seed++) * 700,
  });
});

export const routes = [];

nodes.forEach((node) => {
  const distances = nodes
    .filter((n) => n.id !== node.id)
    .map((n) => ({
      id: n.id,
      dist: Math.sqrt(Math.pow(n.x - node.x, 2) + Math.pow(n.y - node.y, 2)),
      region: n.region,
    }))
    .sort((a, b) => a.dist - b.dist);

  // Connect to 2 nearest same-region neighbors
  const sameRegion = distances.filter((d) => d.region === node.region).slice(0, 2);

  sameRegion.forEach((target) => {
    if (
      !routes.find(
        (r) =>
          (r.source === node.id && r.target === target.id) ||
          (r.source === target.id && r.target === node.id)
      )
    ) {
      routes.push({ source: node.id, target: target.id, distance: target.dist });
    }
  });

  // Bridge connections across the river
  if (Math.abs(node.x - 600) < 150) {
    const crossRegion = distances.filter((d) => d.region !== node.region)[0];
    if (crossRegion && crossRegion.dist < 300 && seededRandom(seed++) > 0.8) {
      if (
        !routes.find(
          (r) =>
            (r.source === node.id && r.target === crossRegion.id) ||
            (r.source === crossRegion.id && r.target === node.id)
        )
      ) {
        routes.push({ source: node.id, target: crossRegion.id, distance: crossRegion.dist });
      }
    }
  }
});
