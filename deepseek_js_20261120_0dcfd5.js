function renderProducts(animate = false){
  const list=document.getElementById("productList");
  const empty=document.getElementById("emptyState");
  const count=document.getElementById("itemCountDisplay");
  const q=searchQuery.toLowerCase().trim();
  const filtered=allProducts.filter(p=>{
    const catOk=selectedCategory==="ALL"||p.category===selectedCategory;
    const sOk=!q||p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)||p.size.toLowerCase().includes(q);
    return catOk&&sOk;
  });
  count.textContent=`${bn(filtered.length)}টি পণ্য`;
  if(filtered.length===0){ list.innerHTML=""; empty.classList.remove("hidden"); return; }
  empty.classList.add("hidden");
  list.innerHTML=filtered.map((p,i)=>{
    const qty=cart[p.id]||0;
    const animClass = animate ? "card-in" : "";
    const animDelay = animate ? `style="animation-delay:${Math.min(i*20,200)}ms"` : "";
    return `
    <div class="${animClass} bg-white dark:bg-slate-900 rounded-2xl border ${qty>0?'border-emerald-400 dark:border-emerald-500 ring-1 ring-emerald-300 dark:ring-emerald-600/40':'border-slate-200 dark:border-slate-800'} p-3 shadow-sm hover:shadow-md transition flex gap-3" ${animDelay}>
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-2xl shrink-0">${getEmoji(p.category)}</div>
      <div class="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p class="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 leading-tight">${escapeHtml(p.category)}</p>
          <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug truncate">${escapeHtml(p.name)}</h3>
          <p class="text-[11px] text-slate-400 dark:text-slate-500">${escapeHtml(p.size)}</p>
        </div>
        <div class="flex items-end justify-between gap-2 mt-1">
          <span class="text-base font-extrabold text-emerald-700 dark:text-emerald-400 font-num">৳ ${bn(p.price)}</span>
          ${qty===0
            ?`<button data-action="add" data-id="${p.id}" class="cart-btn w-9 h-9 rounded-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-90 text-white flex items-center justify-center shadow-sm transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
              </button>`
            :`<div class="inline-flex items-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 rounded-full overflow-hidden">
                <button data-action="dec" data-id="${p.id}" class="cart-btn w-8 h-8 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200/70 dark:hover:bg-emerald-900/60 font-bold text-base transition active:scale-90">−</button>
                <span class="px-2 text-xs font-bold text-emerald-900 dark:text-emerald-200 font-num">${bn(qty)}</span>
                <button data-action="inc" data-id="${p.id}" class="cart-btn w-8 h-8 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200/70 dark:hover:bg-emerald-900/60 font-bold text-base transition active:scale-90">+</button>
              </div>`
          }
        </div>
      </div>
    </div>`;
  }).join("");
}