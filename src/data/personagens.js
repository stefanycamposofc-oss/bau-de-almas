const personagens = [
{id: "azira", nome: "Azira", resumo: "Tiefling | Ladina", sistema: "D&D", foto: "/personagens/azira/retrato.jpg",
    basico: {
        idade: "",
        genero: "",
        raca: "",
        classe: "",
        origem: "",
    },
    aparencia: `Primeiro parágrafo de teste.

Segundo parágrafo de teste.`,
    historia: `História teste`,
    personalidade: {
        qualidades: ["Q1", "Q2", "Q3"],
        defeitos: ["D1", "D2", "D3"],
        hobbies: ["H1", "H2", "H3"],
        manias: ["M1", "M2", "M3"],
        medos: ["Med1", "Med2"],
        traumas: ["T1", "T2", "T3"],
        sexualidade: "Texto de teste",
    },
    gostos: {
        comidas: ["C1", "C2"],
        bebidas: ["B1", "B2"],
        musicas: [],
        cores: ["Cor1", "Cor2"],
        lugares: [],
        outros: ["O1"],
    },
    relacoes: [
        { nome: "Pessoa 1", tipo: "Amiga", descricao: "Descrição teste."},
        { nome: "Pessoa 2", tipo: "Rival", descricao: "Descrição teste."},
        { nome: "Pessoa 3", tipo: "Família", descricao: "Descrição teste."},
    ],
    vestuario: [
        { nome: "Roupa 1", descricao: "Descrição teste." },
        { nome: "Roupa 2", descricao: "Descrição teste." },
    ],
    armas: [
        { nome: "Arma 1", descricao: "Descrição teste.", dano: "1D6", efeitos: ["Efeito1", "Efeito 2"] },
        { nome: "Arma 2", descricao: "Descrição teste.", dano: "1D8" },
    ],
},
{id: "akantha", nome: "Akantha Liadon", resumo: "Tiefling | Feiticeira", sistema: "D&D", foto: "/personagens/akantha/retrato.jpg" },
{id: "victoria", nome: "Victória Viessi", resumo: "Tiefling | Ladina", sistema: "D&D", foto: "/personagens/victoria/retrato.jpg" },
{id: "kira", nome: "Kira Keith", resumo: "Humana | Especialista", sistema: "Ordem Paranormal" },
]

export default personagens