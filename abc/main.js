/* ===== Main Interaction Script ===== */

/* ---------- Modal Controls ---------- */

function showModal(id){
  const modal = document.getElementById(id);
  if(!modal) return;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function hideModal(id){
  const modal = document.getElementById(id);
  if(!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* Close modal when clicking outside */
document.querySelectorAll(".modal-overlay").forEach(overlay=>{
  overlay.addEventListener("click",e=>{
    if(e.target === overlay){
      hideModal(overlay.id);
    }
  });
});

/* Close modal with ESC key */
document.addEventListener("keydown",e=>{
  if(e.key === "Escape"){
    document
      .querySelectorAll(".modal-overlay.active")
      .forEach(m => hideModal(m.id));
  }
});

/* ---------- Step Animation ---------- */

function runStepAnimation(prefix,total,delay){
  let step = 1;

  const timer = setInterval(()=>{
    step++;

    if(step > total){
      clearInterval(timer);
      return;
    }

    const el = document.getElementById(prefix + "step" + step);
    if(el) el.classList.add("active");

  },delay);
}

/* ---------- Form Validation ---------- */

function checkRequired(ids){
  let valid = true;

  ids.forEach(id=>{
    const input = document.getElementById(id);
    if(!input) return;

    if(!input.value.trim()){
      input.style.borderColor = "#e8450a";
      input.style.boxShadow = "0 0 0 3px rgba(232,69,10,.15)";
      valid = false;

      setTimeout(()=>{
        input.style.borderColor = "";
        input.style.boxShadow = "";
      },2000);
    }
  });

  return valid;
}

/* ---------- Hire Form ---------- */

function submitHireForm(){
  const ok = checkRequired([
    "h_name","h_phone","h_city","h_trade","h_desc"
  ]);

  if(!ok) return;

  document.getElementById("hireForm").style.display = "none";
  document.getElementById("hireSuccess").style.display = "block";

  runStepAnimation("h",3,300);
}

/* ---------- Register Form ---------- */

function submitRegisterForm(){
  const ok = checkRequired([
    "r_name","r_phone","r_city","r_trade","r_exp"
  ]);

  if(!ok) return;

  document.getElementById("registerForm").style.display = "none";
  document.getElementById("registerSuccess").style.display = "block";

  runStepAnimation("r",3,300);
}

/* ---------- Navigation Buttons ---------- */

const navCTA = document.querySelector(".nav-cta");
if(navCTA){
  navCTA.onclick = () => showModal("hireModal");
}

/* Hero main buttons */

document.querySelectorAll(".btn-primary").forEach(btn=>{
  const text = btn.textContent.toLowerCase();

  if(text.includes("hire") || text.includes("find")){
    btn.onclick = () => showModal("hireModal");
  }
});

/* CTA banner buttons */

document
  .querySelectorAll(".cta-buttons .btn-primary")
  .forEach(btn => btn.onclick = () => showModal("hireModal"));

document
  .querySelectorAll(".cta-buttons .btn-outline")
  .forEach(btn => btn.onclick = () => showModal("registerModal"));

/* ---------- Worker Tiles ---------- */

document.querySelectorAll(".hire-btn").forEach(btn=>{
  btn.onclick = function(){

    const tile = this.closest(".worker-tile");
    if(tile){

      const tradeText =
        tile.querySelector(".wt-trade")?.textContent || "";

      const select = document.getElementById("h_trade");

      if(select){
        Array.from(select.options).forEach(opt=>{
          const cleanOpt = opt.text
            .toLowerCase()
            .replace(/[^a-z]/g,"");

          if(tradeText.toLowerCase().includes(cleanOpt)){
            select.value = opt.value || opt.text;
          }
        });
      }
    }

    showModal("hireModal");
  };
});

/* ---------- Service Cards ---------- */

document.querySelectorAll(".service-card").forEach(card=>{
  card.onclick = function(){

    const name =
      this.querySelector(".service-name")?.textContent?.trim();

    const select = document.getElementById("h_trade");

    if(name && select){
      Array.from(select.options).forEach(opt=>{
        if(opt.text.toLowerCase().includes(name.toLowerCase())){
          select.value = opt.text;
        }
      });
    }

    showModal("hireModal");
  };
});

/* ---------- Mobile Navigation ---------- */

function toggleNav(btn){
  btn.classList.toggle("open");

  document.querySelector(".nav-links")?.classList.toggle("open");
  document.querySelector(".nav-buttons")?.classList.toggle("open");
}

/* ---------- Footer Links ---------- */

document.querySelectorAll(".footer-col a").forEach(link=>{
  const text = link.textContent;

  if(text.includes("Become a Worker") || text.includes("Post a Job")){

    link.onclick = e=>{
      e.preventDefault();

      if(text.includes("Become")){
        showModal("registerModal");
      }else{
        showModal("hireModal");
      }
    };
  }
});

/* ---------- Extra Buttons ---------- */

document.querySelectorAll(".btn-outline").forEach(btn=>{
  if(btn.textContent.includes("View All")){
    btn.onclick = () => showModal("registerModal");
  }
});

/* Search button */

const searchBtn = document.querySelector(".search-bar button");
if(searchBtn){
  searchBtn.onclick = () => showModal("hireModal");
}// Open modal
function openModal(id) {
  document.getElementById(id).classList.add("active");
}

// Close modal
function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

// Close when clicking outside modal
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });
});

// Mobile nav toggle (optional)
function toggleNav(btn) {
  btn.classList.toggle("open");
  document.querySelector(".nav-links").classList.toggle("open");
  document.querySelector(".nav-buttons").classList.toggle("open");
}