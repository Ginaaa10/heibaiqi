const BOARD_SIZE = 8;
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

// ========== I18N ==========
let currentLang = 'vi';

const i18n = {
    vi: {
        title: 'OTHELLO AI',
        subtitle: 'Trí Tuệ Cờ Bàn',
        selectMode: 'CHỌN CHẾ ĐỘ',
        vsAi: 'CHƠI VỚI MÁY',
        onlinePvp: 'TRỰC TUYẾN',
        localPvp: '2 NGƯỜI CÙNG MÁY',
        rules: 'LUẬT CHƠI',
        onlineLobby: 'PHÒNG TRỰC TUYẾN',
        createRoom: 'TẠO PHÒNG',
        roomCodePlaceholder: 'MÃ PHÒNG...',
        join: 'THAM GIA',
        waiting: 'Đang chờ đối thủ...',
        shareCode: 'Chia sẻ mã phòng cho bạn bè',
        back: 'QUAY LẠI',
        black: 'ĐEN',
        white: 'TRẮNG',
        player1: 'NGƯỜI 1',
        player2: 'NGƯỜI 2',
        you: 'BẠN',
        ai: 'MÁY',
        yourTurn: 'LƯỢC CỦA BẠN',
        aiThinking: 'MÁY ĐANG TÍNH...',
        opponentThinking: 'ĐỐI THỦ ĐANG ĐI...',
        blacksTurn: 'LƯỢC ĐEN',
        whitesTurn: 'LƯỢC TRẮNG',
        youAre: 'Bạn là: ',
        hintOn: 'Gợi ý: BẬT',
        hintOff: 'Gợi ý: TẮT',
        restart: 'CHƠI LẠI',
        noValidMoves: 'Không có nước đi hợp lệ. Bỏ lượt!',
        gameStartAi: 'Bạn đi trước với quân Đen!',
        gameStartLocal: '2 người - Đen đi trước!',
        gameStartOnline: 'Đối thủ đã vào! Bắt đầu!',
        opponentLeft: 'Đối thủ đã thoát!',
        opponentRestart: 'Đối thủ muốn chơi lại!',
        pleaseEnterCode: 'Vui lòng nhập mã phòng!',
        gameRestarted: 'Đã khởi động lại!',
        youWin: 'Bạn thắng!',
        aiWin: 'Máy thắng!',
        blackWins: 'Đen thắng!',
        whiteWins: 'Trắng thắng!',
        draw: 'Hòa!',
        gameOver: 'Kết thúc',
        rulesTitle: 'LUẬT CHƠI OTHELLO',
        rulesP1: 'Mục tiêu: Dùng quân của mình bao vây quân đối phương để đổi màu chúng.',
        rulesList: [
            'Bàn cờ 8x8 ô vuông.',
            'Hai người chơi: Đen đi trước, Trắng đi sau.',
            'Mỗi nước đi phải đặt quân sao quân đối phương bị bao vây giữa hai quân của mình theo hàng ngang, hàng dọc hoặc đường chéo.',
            'Quân đối phương bị bao vây sẽ được đổi màu.',
            'Có thể đánh nhiều quân cùng lúc.',
            'Không có nước hợp lệ → chuyển lượt.',
            'Trò chơi kết thúc khi cả hai không còn nước đi.'
        ],
        rulesEnd: 'Kết thúc: Quân nhiều hơn thắng. Bằng nhau → hòa.'
    },
    zh: {
        title: '黑白棋 AI',
        subtitle: '战略棋盘智能',
        selectMode: '选择模式',
        vsAi: '人机对战',
        onlinePvp: '在线对战',
        localPvp: '双人同屏',
        rules: '游戏规则',
        onlineLobby: '在线大厅',
        createRoom: '创建房间',
        roomCodePlaceholder: '房间代码...',
        join: '加入',
        waiting: '等待对手加入...',
        shareCode: '将房间代码分享给朋友',
        back: '返回',
        black: '黑棋',
        white: '白棋',
        player1: '玩家 1',
        player2: '玩家 2',
        you: '你',
        ai: 'AI',
        yourTurn: '你的回合',
        aiThinking: 'AI 思考中...',
        opponentThinking: '对手思考中...',
        blacksTurn: '黑棋回合',
        whitesTurn: '白棋回合',
        youAre: '你是：',
        hintOn: '提示：开',
        hintOff: '提示：关',
        restart: '重新开始',
        noValidMoves: '无合法落子，跳过回合！',
        gameStartAi: '你执黑先行！',
        gameStartLocal: '双人模式 - 黑棋先行！',
        gameStartOnline: '对手已加入！游戏开始！',
        opponentLeft: '对手已离开！',
        opponentRestart: '对手请求重新开始！',
        pleaseEnterCode: '请输入房间代码！',
        gameRestarted: '游戏已重新开始！',
        youWin: '你赢了！',
        aiWin: 'AI 获胜！',
        blackWins: '黑棋获胜！',
        whiteWins: '白棋获胜！',
        draw: '平局！',
        gameOver: '游戏结束',
        rulesTitle: '黑白棋规则',
        rulesP1: '目标：用自己的棋子包围对方棋子来翻转它们。',
        rulesList: [
            '8x8 棋盘。',
            '两位玩家：黑棋先走，白棋后走。',
            '每次落子必须在横、竖、斜方向上夹住对方棋子。',
            '被夹住的对方棋子将翻转为你的颜色。',
            '一次可以翻转多个方向的棋子。',
            '无合法落子时，跳过回合。',
            '双方都无合法落子时，游戏结束。'
        ],
        rulesEnd: '结束时棋子多者获胜。数量相同则平局。'
    }
};

function t(key) {
    return i18n[currentLang][key] || i18n['vi'][key] || key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('othello-lang', lang);
    updateAllUI();
}

function updateAllUI() {
    document.getElementById('title-text').textContent = t('title');
    document.getElementById('subtitle-text').textContent = t('subtitle');
    document.getElementById('menu-select-mode').textContent = t('selectMode');
    document.getElementById('btn-ai').textContent = t('vsAi');
    document.getElementById('btn-online').textContent = t('onlinePvp');
    document.getElementById('btn-local').textContent = t('localPvp');
    document.getElementById('btn-rules').textContent = t('rules');
    document.getElementById('menu-online-lobby').textContent = t('onlineLobby');
    document.getElementById('btn-create-room').textContent = t('createRoom');
    document.getElementById('room-code-input').placeholder = t('roomCodePlaceholder');
    document.getElementById('btn-join-room').textContent = t('join');
    document.getElementById('waiting-text').textContent = t('waiting');
    document.getElementById('share-code-text').textContent = t('shareCode');
    document.getElementById('btn-back-menu').textContent = t('back');
    document.getElementById('btn-back-game').textContent = t('back');
    document.getElementById('btn-restart').textContent = t('restart');
    document.getElementById('btn-hint').textContent = showingHints ? t('hintOn') : t('hintOff');
    document.getElementById('rules-title').textContent = t('rulesTitle');

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    updatePlayerNames();
    updateTurnIndicator();
}

// ========== GAME STATE ==========
let board = [];
let currentPlayer = BLACK;
let gameMode = 'ai';
let gameOver = false;
let showingHints = true;
let myColor = null;
let lastMove = null;

let socket = null;
let roomCode = null;
let isOnline = false;

const mainMenu = document.getElementById('main-menu');
const roomMenu = document.getElementById('room-menu');
const gameArea = document.getElementById('game-area');
const boardElement = document.getElementById('board');
const currentTurnElement = document.getElementById('current-turn');
const blackScoreElement = document.getElementById('black-score');
const whiteScoreElement = document.getElementById('white-score');
const blackNameElement = document.getElementById('black-name');
const whiteNameElement = document.getElementById('white-name');
const rulesModal = document.getElementById('rules-modal');
const waitingRoom = document.getElementById('waiting-room');
const roomCodeDisplay = document.getElementById('room-code-display');
const roomCodeInput = document.getElementById('room-code-input');
const myColorDisplay = document.getElementById('my-color-display');

function initGame() {
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY));
    board[3][3] = WHITE;
    board[3][4] = BLACK;
    board[4][3] = BLACK;
    board[4][4] = WHITE;

    currentPlayer = BLACK;
    gameOver = false;
    showingHints = true;
    lastMove = null;

    updatePlayerNames();
    renderBoard();
    updateScores();
    updateTurnIndicator();
}

function updatePlayerNames() {
    if (gameMode === 'ai') {
        blackNameElement.textContent = t('you');
        whiteNameElement.textContent = t('ai');
    } else if (isOnline) {
        blackNameElement.textContent = t('black');
        whiteNameElement.textContent = t('white');
        if (myColor) {
            myColorDisplay.textContent = t('youAre') + (myColor === 'black' ? t('black') : t('white'));
            myColorDisplay.className = `my-color ${myColor}`;
            myColorDisplay.classList.remove('hidden');
        }
    } else {
        blackNameElement.textContent = t('player1');
        whiteNameElement.textContent = t('player2');
    }
}

function renderBoard() {
    boardElement.innerHTML = '';

    const turnClass = currentPlayer === BLACK ? 'turn-black' : 'turn-white';
    boardElement.className = `board ${turnClass}`;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (board[row][col] !== EMPTY) {
                const piece = document.createElement('div');
                piece.className = `piece ${board[row][col] === BLACK ? 'black' : 'white'}`;
                cell.appendChild(piece);
            }

            if (lastMove && lastMove.row === row && lastMove.col === col) {
                cell.classList.add('last-move');
            }

            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }

    if (showingHints) {
        showHints();
    }
}

function handleCellClick(row, col) {
    if (gameOver) return;
    if (gameMode === 'ai' && currentPlayer === WHITE) return;
    if (isOnline && myColor) {
        const myPiece = myColor === 'black' ? BLACK : WHITE;
        if (currentPlayer !== myPiece) return;
    }

    if (makeMove(row, col, currentPlayer)) {
        lastMove = { row, col };
        if (isOnline && socket) {
            socket.emit('make-move', { row, col });
        }
        afterMove();
    }
}

function afterMove() {
    currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;

    if (!hasValidMoves(currentPlayer)) {
        if (!hasValidMoves(currentPlayer === BLACK ? WHITE : BLACK)) {
            renderBoard();
            updateScores();
            updateTurnIndicator();
            endGame();
            return;
        } else {
            currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
            showMessage(t('noValidMoves'));
        }
    }

    renderBoard();
    updateScores();
    updateTurnIndicator();

    if (gameMode === 'ai' && currentPlayer === WHITE && !gameOver) {
        setTimeout(makeAIMove, 400);
    }
}

function makeMove(row, col, player) {
    if (!isValidMove(row, col, player)) return false;

    board[row][col] = player;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        const piecesToFlip = [];

        while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] !== EMPTY) {
            if (board[r][c] === player) {
                for (const [fr, fc] of piecesToFlip) {
                    board[fr][fc] = player;
                }
                break;
            }
            piecesToFlip.push([r, c]);
            r += dr;
            c += dc;
        }
    }

    return true;
}

function isValidMove(row, col, player) {
    if (board[row][col] !== EMPTY) return false;

    const opponent = player === BLACK ? WHITE : BLACK;
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        let foundOpponent = false;

        while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            if (board[r][c] === opponent) {
                foundOpponent = true;
            } else if (board[r][c] === player && foundOpponent) {
                return true;
            } else {
                break;
            }
            r += dr;
            c += dc;
        }
    }

    return false;
}

function hasValidMoves(player) {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (isValidMove(row, col, player)) return true;
        }
    }
    return false;
}

function getValidMoves(player) {
    const moves = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (isValidMove(row, col, player)) moves.push([row, col]);
        }
    }
    return moves;
}

function updateScores() {
    let blackCount = 0;
    let whiteCount = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === BLACK) blackCount++;
            else if (board[row][col] === WHITE) whiteCount++;
        }
    }
    blackScoreElement.textContent = blackCount;
    whiteScoreElement.textContent = whiteCount;
}

function updateTurnIndicator() {
    const isBlack = currentPlayer === BLACK;
    if (isOnline && myColor) {
        const myPiece = myColor === 'black' ? BLACK : WHITE;
        currentTurnElement.textContent = (currentPlayer === myPiece) ? t('yourTurn') : t('opponentThinking');
    } else if (gameMode === 'ai') {
        currentTurnElement.textContent = isBlack ? t('yourTurn') : t('aiThinking');
    } else {
        currentTurnElement.textContent = isBlack ? t('blacksTurn') : t('whitesTurn');
    }
}

function makeAIMove() {
    if (gameOver) return;

    const moves = getValidMoves(WHITE);
    if (moves.length === 0) return;

    let bestMove = moves[0];
    let maxFlips = 0;

    for (const [row, col] of moves) {
        const flips = countFlips(row, col, WHITE);
        if (flips > maxFlips) {
            maxFlips = flips;
            bestMove = [row, col];
        }
    }

    makeMove(bestMove[0], bestMove[1], WHITE);
    afterMove();
}

function countFlips(row, col, player) {
    let count = 0;
    const opponent = player === BLACK ? WHITE : BLACK;
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        let foundOpponent = false;

        while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            if (board[r][c] === opponent) {
                foundOpponent = true;
            } else if (board[r][c] === player && foundOpponent) {
                count++;
                break;
            } else {
                break;
            }
            r += dr;
            c += dc;
        }
    }
    return count;
}

function showHints() {
    const moves = getValidMoves(currentPlayer);
    moves.forEach(([row, col]) => {
        const cell = boardElement.children[row * BOARD_SIZE + col];
        cell.classList.add('hint');
    });
    showingHints = true;
}

function toggleHints() {
    showingHints = !showingHints;
    document.getElementById('btn-hint').textContent = showingHints ? t('hintOn') : t('hintOff');
    renderBoard();
}

function showMessage(message) {
    const existing = document.querySelectorAll('.toast');
    existing.forEach(el => el.remove());

    const msgElement = document.createElement('div');
    msgElement.className = 'toast';
    msgElement.textContent = message;
    document.body.appendChild(msgElement);

    setTimeout(() => msgElement.remove(), 3000);
}

function endGame() {
    gameOver = true;

    let blackCount = 0;
    let whiteCount = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col] === BLACK) blackCount++;
            else if (board[row][col] === WHITE) whiteCount++;
        }
    }

    let result;
    if (blackCount > whiteCount) {
        result = gameMode === 'ai' ? t('youWin') : t('blackWins');
    } else if (whiteCount > blackCount) {
        result = gameMode === 'ai' ? t('aiWin') : t('whiteWins');
    } else {
        result = t('draw');
    }

    showMessage(`${t('gameOver')} - ${t('black')}: ${blackCount} vs ${t('white')}: ${whiteCount} - ${result}`);
}

function showArea(area) {
    mainMenu.classList.add('hidden');
    roomMenu.classList.add('hidden');
    gameArea.classList.add('hidden');
    area.classList.remove('hidden');
}

function startLocal2P() {
    gameMode = '2players';
    isOnline = false;
    myColor = null;
    myColorDisplay.classList.add('hidden');
    showArea(gameArea);
    initGame();
    showMessage(t('gameStartLocal'));
}

function startAI() {
    gameMode = 'ai';
    isOnline = false;
    myColor = null;
    myColorDisplay.classList.add('hidden');
    showArea(gameArea);
    initGame();
    showMessage(t('gameStartAi'));
}

function startOnline() {
    showArea(roomMenu);
    waitingRoom.classList.add('hidden');
    roomCodeInput.value = '';
}

function setupSocket() {
    socket = io();

    socket.on('game-start', () => {
        gameMode = '2players';
        isOnline = true;
        showArea(gameArea);
        initGame();
        showMessage(t('gameStartOnline'));
    });

    socket.on('opponent-move', (data) => {
        const piece = data.color === 'black' ? BLACK : WHITE;
        makeMove(data.row, data.col, piece);
        lastMove = { row: data.row, col: data.col };
        afterMove();
    });

    socket.on('opponent-disconnected', () => {
        showMessage(t('opponentLeft'));
    });

    socket.on('game-restarted', () => {
        initGame();
        showMessage(t('opponentRestart'));
    });
}

// ========== EVENT LISTENERS ==========
document.getElementById('btn-ai').addEventListener('click', startAI);

document.getElementById('btn-online').addEventListener('click', () => {
    if (!socket) setupSocket();
    startOnline();
});

document.getElementById('btn-local').addEventListener('click', startLocal2P);

document.getElementById('btn-create-room').addEventListener('click', () => {
    socket.emit('create-room', (response) => {
        if (response.success) {
            roomCode = response.code;
            myColor = response.color;
            roomCodeDisplay.textContent = response.code;
            waitingRoom.classList.remove('hidden');
        }
    });
});

document.getElementById('btn-join-room').addEventListener('click', () => {
    const code = roomCodeInput.value.trim().toUpperCase();
    if (!code) {
        showMessage(t('pleaseEnterCode'));
        return;
    }
    socket.emit('join-room', code, (response) => {
        if (response.success) {
            roomCode = response.code;
            myColor = response.color;
        } else {
            showMessage(response.error);
        }
    });
});

document.getElementById('btn-back-menu').addEventListener('click', () => {
    showArea(mainMenu);
});

document.getElementById('btn-rules').addEventListener('click', () => {
    document.getElementById('rules-title').textContent = t('rulesTitle');
    document.getElementById('rules-p1').textContent = t('rulesP1');
    document.getElementById('rules-end').textContent = t('rulesEnd');
    const list = document.getElementById('rules-list');
    list.innerHTML = '';
    t('rulesList').forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
    rulesModal.classList.remove('hidden');
});

document.querySelector('.close-btn').addEventListener('click', () => {
    rulesModal.classList.add('hidden');
});

document.getElementById('btn-hint').addEventListener('click', toggleHints);

document.getElementById('btn-restart').addEventListener('click', () => {
    if (isOnline && socket) {
        socket.emit('restart-game');
    }
    initGame();
    showMessage(t('gameRestarted'));
});

document.getElementById('btn-back-game').addEventListener('click', () => {
    if (isOnline) {
        showArea(roomMenu);
    } else {
        showArea(mainMenu);
    }
});

rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        rulesModal.classList.add('hidden');
    }
});

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
    });
});

// ========== INIT ==========
const savedLang = localStorage.getItem('othello-lang') || 'vi';
setLang(savedLang);
