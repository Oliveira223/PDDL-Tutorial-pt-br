const curriculum = [
  {
    section: "Comece aqui",
    lessons: [
      { title: "Apresentacao do curso", path: "content/README.md" },
      { title: "Roadmap de aprendizado", path: "content/roadmap.md" },
      { title: "Glossario", path: "content/glossario.md" }
    ]
  },
  {
    section: "00 - Fundamentos",
    lessons: [
      { title: "Introducao ao PDDL", path: "content/00 - Fundamentos/01 - Introdução PDDL.md" },
      { title: "Paradigma declarativo", path: "content/00 - Fundamentos/02 - Paradigma Declarativo.md" }
    ]
  },
  {
    section: "01 - PDDL",
    lessons: [
      { title: "Visao geral", path: "content/01 - PDDL/01 - Visão Geral.md" },
      { title: "Estrutura do dominio", path: "content/01 - PDDL/02 - Estrutura do Domínio.md" },
      { title: "Estrutura do problema", path: "content/01 - PDDL/03 - Problem Estrutura.md" },
      { title: "Predicados", path: "content/01 - PDDL/04 - Predicados.md" },
      { title: "Acoes", path: "content/01 - PDDL/05 - Ações.md" },
      { title: "Pre-condicoes", path: "content/01 - PDDL/06 - Pré-condições.md" },
      { title: "Efeitos", path: "content/01 - PDDL/07 - Efeitos.md" },
      { title: "Tipos", path: "content/01 - PDDL/08 - Tipos.md" },
      { title: "Restricoes", path: "content/01 - PDDL/09 - Restrições.md" },
      { title: "Exemplo completo", path: "content/01 - PDDL/10 - Exemplo Completo.md" }
    ]
  },
  {
    section: "02 - Python",
    lessons: [
      { title: "Visao Python", path: "content/02 - Python/01 - Visão Python.md" },
      { title: "Leitura de PDDL", path: "content/02 - Python/02 - Leitura PDDL.md" },
      { title: "Criacao de dominios", path: "content/02 - Python/03 - Criação de Domínios.md" },
      { title: "Manipulacao de problemas", path: "content/02 - Python/04 - Manipulação de Problemas.md" },
      { title: "Integracao com planner", path: "content/02 - Python/05 - Integração com Planner.md" }
    ]
  },
  {
    section: "03 - Planners",
    lessons: [
      { title: "Visao de planners", path: "content/03 - Planners/01 - Visão Planners.md" },
      { title: "Algoritmos de busca", path: "content/03 - Planners/02 - Algoritmos de Busca.md" },
      { title: "Heuristicas", path: "content/03 - Planners/03 - Heurísticas.md" },
      { title: "Fast Downward", path: "content/03 - Planners/04 - Fast Downward.md" },
      { title: "Debug de planejamento", path: "content/03 - Planners/05 - Debug de Planejamento.md" }
    ]
  },
  {
    section: "04 - Projetos",
    lessons: [
      { title: "Projeto Blocksworld", path: "content/04 - Projetos/01 - Blocksworld.md" },
      { title: "Projeto Grid Navegacao", path: "content/04 - Projetos/02 - Grid Navegação.md" },
      { title: "Projeto Logistica", path: "content/04 - Projetos/03 - Logística.md" },
      { title: "Projeto final", path: "content/04 - Projetos/04 - Projeto Final.md" }
    ]
  },
  {
    section: "Exercicios",
    lessons: [
      { title: "Basicos", path: "content/exercicios/01 - Básicos.md" },
      { title: "Intermediarios", path: "content/exercicios/02 - Intermediários.md" },
      { title: "Desafios", path: "content/exercicios/03 - Desafios.md" }
    ]
  }
];

const nav = document.getElementById("lesson-nav");
const titleEl = document.getElementById("lesson-title");
const breadcrumbEl = document.getElementById("breadcrumb");
const contentEl = document.getElementById("lesson-content");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");
const prevBtn = document.getElementById("prev-lesson");
const nextBtn = document.getElementById("next-lesson");

const flatLessons = [];

for (const group of curriculum) {
  group.lessons.forEach((lesson) => {
    flatLessons.push({ ...lesson, section: group.section, id: slugify(`${group.section}-${lesson.title}`) });
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildSidebar() {
  const fragment = document.createDocumentFragment();

  curriculum.forEach((group) => {
    const section = document.createElement("section");
    section.className = "section-block";

    const h3 = document.createElement("h3");
    h3.className = "section-title";
    h3.textContent = group.section;
    section.appendChild(h3);

    group.lessons.forEach((lesson) => {
      const id = slugify(`${group.section}-${lesson.title}`);
      const button = document.createElement("button");
      button.className = "lesson-link";
      button.dataset.id = id;
      button.textContent = lesson.title;
      button.addEventListener("click", () => {
        location.hash = `#/aula/${id}`;
        closeSidebarOnMobile();
      });
      section.appendChild(button);
    });

    fragment.appendChild(section);
  });

  nav.innerHTML = "";
  nav.appendChild(fragment);
}

function resolveAssetPath(baseFilePath, targetPath) {
  if (!targetPath || /^(https?:)?\/\//.test(targetPath) || targetPath.startsWith("#")) {
    return targetPath;
  }

  const baseParts = baseFilePath.split("/");
  baseParts.pop();
  const rawParts = [...baseParts, ...targetPath.split("/")];
  const resolved = [];

  for (const part of rawParts) {
    if (part === "" || part === ".") {
      continue;
    }
    if (part === "..") {
      resolved.pop();
      continue;
    }
    resolved.push(part);
  }

  return resolved.join("/");
}

function configureMarked(basePath) {
  const renderer = new marked.Renderer();

  renderer.link = (...args) => {
    const source = typeof args[0] === "object" ? args[0] : { href: args[0], title: args[1], text: args[2] };
    const href = source?.href || "";
    const text = source?.text || source?.tokens?.map((token) => token.raw || "").join("") || href;
    const title = source?.title || "";
    const url = resolveAssetPath(basePath, href);
    const encoded = encodeURI(url);
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${encoded}"${titleAttr} target="_blank" rel="noreferrer">${text}</a>`;
  };

  renderer.image = (...args) => {
    const source = typeof args[0] === "object" ? args[0] : { href: args[0], title: args[1], text: args[2] };
    const href = source?.href || "";
    const title = source?.title || "";
    const text = source?.text || "";
    const url = resolveAssetPath(basePath, href);
    const encoded = encodeURI(url);
    const titleAttr = title ? ` title="${title}"` : "";
    return `<img src="${encoded}" alt="${text || ""}"${titleAttr} loading="lazy" />`;
  };

  marked.setOptions({ renderer, gfm: true, breaks: false });
}

async function loadLessonById(id) {
  const lesson = flatLessons.find((entry) => entry.id === id) || flatLessons[0];
  if (!lesson) {
    return;
  }

  titleEl.textContent = lesson.title;
  breadcrumbEl.textContent = `${lesson.section} / Aula`;

  document.querySelectorAll(".lesson-link").forEach((item) => {
    item.classList.toggle("active", item.dataset.id === lesson.id);
  });

  const currentIndex = flatLessons.findIndex((entry) => entry.id === lesson.id);
  const prev = flatLessons[currentIndex - 1];
  const next = flatLessons[currentIndex + 1];

  prevBtn.disabled = !prev;
  nextBtn.disabled = !next;

  prevBtn.onclick = () => {
    if (prev) {
      location.hash = `#/aula/${prev.id}`;
    }
  };

  nextBtn.onclick = () => {
    if (next) {
      location.hash = `#/aula/${next.id}`;
    }
  };

  try {
    configureMarked(lesson.path);
    const response = await fetch(encodeURI(lesson.path));
    if (!response.ok) {
      throw new Error(`Erro ao carregar ${lesson.path}`);
    }
    const markdown = await response.text();
    contentEl.innerHTML = marked.parse(markdown);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    contentEl.innerHTML = `<p>Falha ao carregar a aula.</p><pre>${error.message}</pre>`;
  }
}

function route() {
  const match = location.hash.match(/^#\/aula\/(.+)$/);
  const lessonId = match?.[1] || flatLessons[0]?.id;
  loadLessonById(lessonId);
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 980) {
    sidebar.classList.remove("open");
  }
}

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

window.addEventListener("hashchange", route);
window.addEventListener("resize", closeSidebarOnMobile);

buildSidebar();
route();
