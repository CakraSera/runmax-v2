// sort.js — click a card, then click the bin it belongs in.
//
// Markup contract:
//   <div class="sort">
//     <p class="question">…</p>
//     <ul class="sort-pool">
//       <li>
//         <button class="sort-card" data-answer="fail">Label</button>
//         <p class="sort-why">Shown after a placement, right or wrong.</p>
//       </li>
//     </ul>
//     <div class="sort-bins">
//       <div class="sort-bin" data-bin="fail">
//         <p class="sort-bin-label">Floor fail</p>
//         <ul class="sort-bin-cards"></ul>
//       </div>
//     </div>
//     <p class="sort-status"></p>
//     <button class="sort-retry">Try again</button>
//   </div>
//
// data-answer on the card must match data-bin on the correct bin.
// Wrong placement stays in the pool and shows why. Right placement moves.

function initSort(root) {
  const pool = root.querySelector(".sort-pool");
  const cards = [...root.querySelectorAll(".sort-card")];
  const bins = [...root.querySelectorAll(".sort-bin")];
  const status = root.querySelector(".sort-status");
  const retry = root.querySelector(".sort-retry");
  let selected = null;

  function paint() {
    const placed = cards.filter((card) => card.disabled).length;
    if (status) {
      status.textContent =
        placed === cards.length
          ? "All placed. Check the sheet if any why-text surprised you."
          : placed + " of " + cards.length + " placed.";
    }
    root.classList.toggle("done", placed === cards.length);
  }

  function select(card) {
    selected = card;
    for (const other of cards) {
      other.classList.toggle("selected", other === card);
    }
  }

  function place(bin) {
    if (!selected || selected.disabled) return;
    const item = selected.closest("li");
    const why = item.querySelector(".sort-why");
    const right = selected.dataset.answer === bin.dataset.bin;
    selected.classList.remove("selected");
    if (why) why.hidden = false;
    if (right) {
      selected.classList.remove("wrong");
      selected.classList.add("right");
      selected.disabled = true;
      bin.querySelector(".sort-bin-cards").append(item);
      selected = null;
    } else {
      selected.classList.add("wrong");
    }
    paint();
  }

  function reset() {
    selected = null;
    for (const card of cards) {
      const item = card.closest("li");
      const why = item.querySelector(".sort-why");
      card.disabled = false;
      card.classList.remove("selected", "right", "wrong");
      if (why) why.hidden = true;
      pool.append(item);
    }
    root.classList.remove("done");
    paint();
    if (cards.length) cards[0].focus();
  }

  for (const card of cards) {
    card.addEventListener("click", () => {
      if (!card.disabled) select(card);
    });
  }
  for (const bin of bins) {
    bin.addEventListener("click", () => place(bin));
  }
  if (retry) retry.addEventListener("click", reset);
  paint();
}

document.querySelectorAll(".sort").forEach(initSort);
