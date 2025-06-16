// Markers in general
const generelMarkerColor = "var(--wp--preset--color--moss)";
const generelOutlineColor = "var(--wp--preset--color--moss)" + " " + "solid 1.35px";

// Trash
const trashMarkerColor = "var(--wp--preset--color--clay)";
const trashOutlineColor = "var(--wp--preset--color--clay)" + " " + "solid 1.35px";


const markers = [
  // Information
  {
    label: { da: "Information og butik", en: "Information and store" },
    group: "Information",
    disableClustering: true,
    x: 4992,
    y: 9088,
    iconSet: "i",
    icon: "mdi\:information-variant",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC09126_compressed.webp" alt="Vægplante med flotte lyserøde blomster, som vokser på siden af receptionen">
            <p style="margin: 10px 0 0;">Få hjælp, gode råd og souvenirs i receptionen. Her tjekker du ind og får svar på spørgsmål om Terrariet.</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC09126_compressed.webp" alt="Wall plant with beautiful pink flowers growing on the side of the reception">
            <p style="margin: 10px 0 0;">Get help, advice, and souvenirs at the reception. This is where you check in and get answers to all your questions about the Reptile Zoo.</p>
          </div>
        ` },
  },
  // Dyr
  // // Ørken
  {
    label: { da: "Nøgenrotter", en: "Mole Rats" },
    group: "Ørken",
    x: 6584,
    y: 4240,
    iconset: "i",
    icon: "healthicons\:animal-rat",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/06/Noegenrotter_compressed.webp" alt="Pool med rutsjebane, blå liner og boblebad">
            <p style="margin: 10px 0 0;">Nøgenrotter lever under jorden i store kolonier og har et spændende socialt liv. Se dem grave og samarbejde – de ligner ingen andre gnavere!</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/06/Noegenrotter_compressed.webp" alt="Pool med rutsjebane, blå liner og boblebad">
            <p style="margin: 10px 0 0;">Mole rats live underground in large colonies and have a fascinating social life. Watch them dig and work together – they’re unlike any other rodents!</p>
          </div>
        ` },
  },
  {
    label: { da: "Klapperslanger", en: "Rattlesnake" },
    group: "Ørken",
    x: 6584,
    y: 4684,
    iconset: "i",
    icon: "healthicons\:animal-snake",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC3984_compressed.webp" alt="Pool med rutsjebane, blå liner og boblebad">
            <p style="margin: 10px 0 0;">Klapperslangen er kendt for sin karakteristiske raslende hale og giftige bid. Hold øje – den gemmer sig ofte mellem stenene!</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC3984_compressed.webp" alt="Pool med rutsjebane, blå liner og boblebad">
            <p style="margin: 10px 0 0;">The rattlesnake is famous for its rattling tail and venomous bite. Watch out – it often hides among the rocks!</p>
          </div>
        ` },
  },
  {
    label: { da: "Surikater", en: "Meerkat" },
    group: "Ørken",
    x: 8143,
    y: 4448,
    iconset: "i",
    icon: "fluent\:animal-paw-print-16-filled",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC03400_compressed.webp" alt="Pool med rutsjebane, blå liner og boblebad">
            <p style="margin: 10px 0 0;">De nysgerrige surikater elsker at holde vagt! Kig efter de små vagthunde, som står på bagbenene og holder øje med omgivelserne.</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC03400_compressed.webp" alt="Pool med rutsjebane, blå liner og boblebad">
            <p style="margin: 10px 0 0;">The curious meerkats love to keep watch! Look for the little sentinels standing on their hind legs, keeping an eye on their surroundings.</p>
          </div>
        ` },
  },
  // // Regnskov
  {
    label: { da: "Paryk Tamariner", en: "Emperor Tamarin" },
    group: "Regnskov",
    x: 7159,
    y: 6696,
    iconset: "i",
    icon: "fluent-emoji-high-contrast\:monkey",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/Abe-close-up_compressed.webp" alt="Paryk Tamarin abe som kigger op">
            <p style="margin: 10px 0 0;">Se de sjove paryk-tamariner! Disse små aber er kendt for deres fine, hvide paryk og deres livlige energi i regnskoven.</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/Abe-close-up_compressed.webp" alt="Emperor Tamarin monkey looking up">
            <p style="margin: 10px 0 0;">Meet the entertaining emperor tamarins! These small monkeys are known for their striking white wig and lively energy in the rainforest.</p>
          </div>
        ` },
  },
  {
    label: { da: "Filipinsk Krokodille", en: "Philippine crocodile" },
    group: "Regnskov",
    x: 8295,
    y: 6224,
    iconset: "i",
    icon: "game-icons\:triple-claws",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/vlcsnap-2025-05-29-21h02m51s646_compressed.webp" alt="BILLEDE MANGLER">
            <p style="margin: 10px 0 0;">Oplev den sjældne filipinske krokodille – én af verdens mest truede krokodillearter. Hold øje med dens stærke kæber!</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/vlcsnap-2025-05-29-21h02m51s646_compressed.webp" alt="BILLEDE MANGLER">
            <p style="margin: 10px 0 0;">Discover the rare Philippine crocodile – one of the world’s most endangered crocodile species. Watch out for its powerful jaws!Discover the rare Philippine crocodile – one of the world’s most endangered crocodile species. Watch out for its powerful jaws!</p>
          </div>
        ` },
  },
  // // Grotte   
  {
    label: { da: "Grøn Anakonda og Frynseskildpadde", en: "Green anaconda and The Mata Mata Turtle" },
    group: "Grotte",
    x: 1967,
    y: 5152,
    iconset: "i",
    icon: "fluent\:animal-turtle-28-filled",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/Frynse_compressed.webp" alt="Frynseskildpadde som kigger ind i kameraet">
            <p style="margin: 10px 0 0;">Mød Sydamerikas kæmpe: den grønne anakonda, verdens tungeste slange! I bassinet gemmer sig også den specielle mata mata-skildpadde, der er mester i camouflage.</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/Frynse_compressed.webp" alt="Mata Mata Turtle looking into the camera">
            <p style="margin: 10px 0 0;">Meet the giant of South America: the green anaconda, the world’s heaviest snake! In the pool you’ll also find the unique Mata Mata Turtle, a master of camouflage.</p>
          </div>
        ` },
  },
  {
    label: { da: "Komodoveraner", en: "Komodo Dragons" },
    group: "Grotte",
    x: 4959,
    y: 7424,
    iconset: "i",
    icon: "game-icons\:gecko",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/Komodo_compressed.webp" alt="To komodoveraner som ligger sammen">
            <p style="margin: 10px 0 0;">Se verdens største øgle! Komodoveranen kan blive op til 3 meter lang og er en ægte top-rovdyr fra Indonesien.</p>
          </div>
        `, en: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/Komodo_compressed.webp" alt="Two komodo dragons nesting together">
            <p style="margin: 10px 0 0;">See the world’s largest lizard! The Komodo dragon can grow up to 3 meters long and is a true top predator from Indonesia.</p>
          </div>
        ` },
  },
  {
    label: { da: "Legeplads", en: "Playground" },
    group: "Udendørs",
    x: 4991,
    y: 2208,
    iconSet: "i",
    icon: "map\:playground",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <img src="../wp-content/uploads/2025/05/DSC09132_compressed.webp" alt="Legetårn og gyngestativ">
            <p style="margin: 10px 0 0;">Slip børnene løs på legepladsen! Her kan de klatre, rutsje og få nye venner i sikre omgivelser.</p>
          </div>
      `, en: `
        <div style="text-align:center;">
          <img src="../wp-content/uploads/2025/05/DSC09132_compressed.webp" alt="Legetårn og gyngestativ">
          <p style="margin: 10px 0 0;">Let the kids run wild on the playground! They can climb, slide, and make new friends in a safe environment.</p>
        </div>
        ` },
  },
  {
    label: { da: "Spiseområde", en: "Picnic Spot" },
    group: "Udendørs",
    x: 8384,
    y: 1152,
    iconSet: "i",
    icon: "ph\:picnic-table-bold",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <p style="margin: 10px 0 0;">Tag en pause og nyd madpakken ved vores hyggelige picnicområde. Her er borde og bænke til fri afbenyttelse.</p>
          </div>
      `, en: `
        <div style="text-align:center;">
          <p style="margin: 10px 0 0;">Take a break and enjoy your packed lunch at our cozy picnic spot. Tables and benches are available for everyone.</p>
        </div>
        ` },
  },
  // Toiletter
  {
    label: { da: "Herretoilet", en: "Men's restrooms" },
    group: "Toiletter",
    x: 868,
    y: 4956,
    iconSet: "i",
    icon: "mdi\:human-male",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <p style="margin: 10px 0 0;">Her finder du herretoiletterne.</p>
          </div>
      `, en: `
        <div style="text-align:center;">
          <p style="margin: 10px 0 0;">Here you find the men’s restrooms.</p>
        </div>
        ` },
  },
  {
    label: { da: "Dametoiletter", en: "Women's restrooms" },
    group: "Toiletter",
    x: 872,
    y: 5324,
    iconSet: "i",
    icon: "mdi\:human-female",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <p style="margin: 10px 0 0;">Her finder du dametoiletterne.</p>
          </div>
      `, en: `
        <div style="text-align:center;">
          <p style="margin: 10px 0 0;">Here you find the women’s restrooms.</p>
        </div>
        ` },
  },
  {
    label: { da: "Handicap WC - Skifteplads", en: "Disability WC - Changing Station" },
    group: "Toiletter",
    x: 864,
    y: 4536,
    iconSet: "i",
    icon: "mdi\:human-male-female-child",
    color: generelMarkerColor,
    outlineColor: generelOutlineColor,
    popup:
    {
      da: `
          <div style="text-align:center;">
            <p style="margin: 10px 0 0;">Tilgængeligt handicaptoilet med skifteplads til babyer og børn.</p>
          </div>
      `, en: `
        <div style="text-align:center;">
          <p style="margin: 10px 0 0;">Accessible restroom with changing station for babies and children.</p>
        </div>
        ` },
  },
  // Skraldespande
  {
    label: { da: "Skraldespand", en: "Waste bins" },
    group: "Skraldespande",
    clusterGroup: "Skraldespande",
    x: 5928,
    y: 3664,
    iconSet: "i",
    icon: "mdi\:recycle",
    color: trashMarkerColor,
    outlineColor: trashOutlineColor,
    small: true,

  },
  {
    label: { da: "Skraldespand", en: "Waste bins" },
    group: "Skraldespande",
    clusterGroup: "Skraldespande",
    x: 7628,
    y: 5420,
    iconSet: "i",
    icon: "mdi\:recycle",
    color: trashMarkerColor,
    outlineColor: trashOutlineColor,
    small: true,

  },
  {
    label: { da: "Skraldespand", en: "Waste bins" },
    group: "Skraldespande",
    clusterGroup: "Skraldespande",
    x: 1368,
    y: 4744,
    iconSet: "i",
    icon: "mdi\:recycle",
    color: trashMarkerColor,
    outlineColor: trashOutlineColor,
    small: true,

  },
  {
    label: { da: "Skraldespand", en: "Waste bins" },
    group: "Skraldespande",
    clusterGroup: "Skraldespande",
    x: 8528,
    y: 2496,
    iconSet: "i",
    icon: "mdi\:recycle",
    color: trashMarkerColor,
    outlineColor: trashOutlineColor,
    small: true,

  },
  {
    label: { da: "Skraldespand", en: "Waste bins" },
    group: "Skraldespande",
    clusterGroup: "Skraldespande",
    x: 4048,
    y: 6384,
    iconSet: "i",
    icon: "mdi\:recycle",
    color: trashMarkerColor,
    outlineColor: trashOutlineColor,
    small: true,

  }
];