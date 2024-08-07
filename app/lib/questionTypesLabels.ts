import { AdjustmentsHorizontalIcon,  BoltIcon, BookOpenIcon, BookmarkIcon,  CheckCircleIcon, ForwardIcon, HandRaisedIcon, ListBulletIcon, RectangleStackIcon,  SquaresPlusIcon, ViewColumnsIcon, ViewfinderCircleIcon } from "@heroicons/react/24/outline";

export const questionTypesLabels = [
    {
        name: "TRUE_FALSE",
        description: {
            english: "Determine whether the statement is true or false.",
            portuguese: "Determinar se a afirmação é verdadeira ou falsa.",
        },
        href: "true_false",
        icon: CheckCircleIcon,

        label: { english: "True or False", portuguese: "Verdadeiro ou Falso" },
    },
    {
        name: "FLASH_CARD",
        description: {
            english: "Review using flash cards.",
            portuguese: "Revisar usando cartões de memória.",
        },
        href: "flash_card",
        icon: RectangleStackIcon,

        label: { english: "Flash Card", portuguese: "Cartão de Memória" },
    },
    {
        name: "MULTIPLE_CHOICE",
        description: {
            english: "Choose the correct answer.",
            portuguese: "Escolha a resposta correta.",
        },
        href: "multiple_choice",
        icon: ListBulletIcon,

        label: { english: "Multiple Choice", portuguese: "Múltipla Escolha" },
    },
    {
        name: "SHORT_ANSWER",
        description: {
            english: "Provide a brief answer.",
            portuguese: "Forneça uma resposta curta.",
        },
        href: "short_answer",
        icon: ForwardIcon,

        label: { english: "Short Answer", portuguese: "Resposta Curta" },
    },
    {
        name: "MATCHING",
        description: {
            english: "Match related items.",
            portuguese: "Associe itens relacionados.",
        },
        href: "matching",
        icon: AdjustmentsHorizontalIcon,

        label: { english: "Matching", portuguese: "Associação" },
    },
    {
        name: "ESSAY",
        description: {
            english: "Write a detailed essay.",
            portuguese: "Escreva uma redação detalhada.",
        },
        href: "essay",
        icon: BookOpenIcon,

        label: { english: "Essay", portuguese: "Redação" },
    },
    {
        name: "SUMMARY",
        description: {
            english: "Summarize the content.",
            portuguese: "Resuma o conteúdo.",
        },
        href: "summary",
        icon: BookmarkIcon,

        label: { english: "Summary", portuguese: "Resumo" },
    },
    {
        name: "ACTION_ITEM",
        description: {
            english: "Define an action item.",
            portuguese: "Defina um item de ação.",
        },
        href: "action_item",
        icon: BoltIcon,

        label: { english: "Action Item", portuguese: "Item de Ação" },
    },
    {
        name: "FILL_IN_THE_BLANK",
        description: {
            english: "Fill in the missing words.",
            portuguese: "Preencha as lacunas.",
        },
        href: "fill_in_the_blank",
        icon: ViewfinderCircleIcon,

        label: {
            english: "Fill in the Blank",
            portuguese: "Preencher as Lacunas",
        },
    },
    {
        name: "MULTIPLE_RESPONSE",
        description: {
            english: "Select multiple correct answers.",
            portuguese: "Selecione várias respostas corretas.",
        },
        href: "multiple_response",
        icon: SquaresPlusIcon,

        label: {
            english: "Multiple Response",
            portuguese: "Resposta Múltipla",
        },
    },
    {
        name: "ORDERING",
        description: {
            english: "Order the items correctly.",
            portuguese: "Ordene os itens corretamente.",
        },
        href: "ordering",
        icon: ViewColumnsIcon,

        label: { english: "Ordering", portuguese: "Ordenação" },
    },
    {
        name: "DRAG_AND_DROP",
        description: {
            english: "Drag items to the correct place.",
            portuguese: "Arraste os itens para o lugar correto.",
        },
        href: "drag_and_drop",
        icon: HandRaisedIcon,

        label: { english: "Drag and Drop", portuguese: "Arrastar e Soltar" },
    },
];
