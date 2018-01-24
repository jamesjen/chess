

var chess = {
	colorTurn: 'black',
	colorIdentity: 'white',
	board: '',
	whitePieces: [],
	blackPieces: [],
	whitePiecesCaptured: [],
	blackPiecesCaptured: [],
	rankToNumberHelper: {
		A: 1,
		B: 2,
		C: 3,
		D: 4,
		E: 5,
		F: 6,
		G: 7,
		H: 8,
		a: 1,
		b: 2,
		c: 3,
		d: 4,
		e: 5,
		f: 6,
		g: 7,
		h: 8,
		'1': 'a',
		'2': 'b',
		'3': 'c',
		'4': 'd',
		'5': 'e',
		'6': 'f',
		'7': 'g',
		'8': 'h'
	},

	pieceCharacterHelper: {
		w: {
			P: '♙',
			N: '♘',
			B: '♗',
			R: '♖',
			Q: '♕',
			K: '♔'
		},

		b: {
			P: '♟',
			N: '♞',
			B: '♝',
			R: '♜',
			Q: '♛',
			K: '♚'
		}
	}, //var pieceCharacterHelper = {

	createBoard: function() {
		var nRank = 8;
		var nRow = 8;

		var board = $('<div>');
		board.attr("id",'board');
		board.addClass("board");

		//creating each Square
		for (var iRow = nRank; 1 <= iRow; iRow--) {
			for (var iRank = 1; iRank <= nRank; iRank++) {
				var square = chess.createSquare(iRow,iRank);
				board.append(square);
			} //for Rank
		} //for Row
		this.board = board;
	},

	createSquare: function(rank,row){
		var square = $('<div>');
		square.addClass("square");


		var rankType = rank %2;					//either odd or even
		var rowType = row %2;					//either odd or even
		if (rankType === rowType) {
			square.addClass("square-black");
		} else {
			square.addClass("square-white");
		}

		var idChar = String.fromCharCode(96 + row);
		var id = idChar + rank;
		square.attr('id',id);

		return square;
	}, //function create square

	setupBoardPieces: function() {
		//Creating White Pawns
		this.whitePieces.push(new Piece('white','R','a1'));
		this.whitePieces.push(new Piece('white','N','b1'));
		this.whitePieces.push(new Piece('white','B','c1'));
		this.whitePieces.push(new Piece('white','Q','d1'));
		this.whitePieces.push(new Piece('white','K','e1'));
		this.whitePieces.push(new Piece('white','B','f1'));
		this.whitePieces.push(new Piece('white','N','g1'));
		this.whitePieces.push(new Piece('white','R','h1'));

		//Creating White Pawns
		this.whitePieces.push(new Piece('white','P','a2'));
		this.whitePieces.push(new Piece('white','P','b2'));
		this.whitePieces.push(new Piece('white','P','c2'));
		this.whitePieces.push(new Piece('white','P','d2'));
		this.whitePieces.push(new Piece('white','P','e2'));
		this.whitePieces.push(new Piece('white','P','f2'));
		this.whitePieces.push(new Piece('white','P','g2'));
		this.whitePieces.push(new Piece('white','P','h2'));

		//Creating Black Major Pieces
		this.blackPieces.push(new Piece('black','R','a8'));
		this.blackPieces.push(new Piece('black','N','b8'));
		this.blackPieces.push(new Piece('black','B','c8'));
		this.blackPieces.push(new Piece('black','Q','d8'));
		this.blackPieces.push(new Piece('black','K','e8'));
		this.blackPieces.push(new Piece('black','B','f8'));
		this.blackPieces.push(new Piece('black','N','g8'));
		this.blackPieces.push(new Piece('black','R','h8'));

		//Creating Black Pawns
		this.blackPieces.push(new Piece('black','P','a7'));
		this.blackPieces.push(new Piece('black','P','b7'));
		this.blackPieces.push(new Piece('black','P','c7'));
		this.blackPieces.push(new Piece('black','P','d7'));
		this.blackPieces.push(new Piece('black','P','e7'));
		this.blackPieces.push(new Piece('black','P','f7'));
		this.blackPieces.push(new Piece('black','P','g7'));
		this.blackPieces.push(new Piece('black','P','h7'));

		//Adding Drag and Drop capabilities
		var squareID;
		var squareArrayHTML = [];

		var squareRow;
		var squareRank;

		var nRow =8;
		var nRank = 8;


		for (var iRow = 1; iRow <= nRow; iRow++) {
			for (var iRank = 1; iRank <= nRank; iRank++) {
				squareRow = String.fromCharCode(96 + iRow);
				squareRank = iRank;

				squareID = squareRow+squareRank;
				squareArrayHTML.push(document.getElementById(squareID));
			}
		} //for (var iRow = 1; iRow <= nRow; iRow++) {

		var drake = new dragula(squareArrayHTML,{
			moves: function(el, source, handle, sibling) {
				var piece = chess.getPiece(el.id);
				// if (piece.color === chess.colorIdentity) {
				// 	return true;
				// } else {
				// 	return false;
				// }
				return true;
			},
			accepts: function (el, target, source, sibling) {
				var validMoveFlag = chess.checkValidMove(el.id,target.id);
				return validMoveFlag;
			},
			revertOnSpill: true
		});
		drake.on('drop',function(el, target, source, sibling){
			if (chess.checkValidCapture(el.id,target.id)) {
				chess.captureOnSquare(el.id,target.id);
			}
			chess.updateBoard();
		});
		chess.updateBoard();
	}, //createBoard: function {

	updateBoard: function() {
		//whitePieces
		this.whitePieces.forEach(function(piece) {
			piece.updateMoves();
		});
		//blackPieces
		this.blackPieces.forEach(function(piece) {
			piece.updateMoves();
		});
	 },//updateBoard function

	getPiece: function(id) {
		var returnPiece;
	 	this.whitePieces.forEach((piece) => {
	 		if (piece.id === id) {
	 			returnPiece = piece;
	 		}
	 	});

	 	this.blackPieces.forEach((piece) => {
	 		if (piece.id === id) {
	 			returnPiece = piece;
	 		}
	 	});
	 	return returnPiece;
	 },

	 getPieceOnSquare: function(squareID) {
	 	var pieceID = $('#'+squareID).children()[0].id;
	 	var piece = this.getPiece(pieceID);
	 	return piece;
	 },

	 captureOnSquare: function(pieceID,squareID) {
	 	var squareDOM = $('#'+squareID);
	 	console.log(squareDOM.children().length);
	 	var capturedPiece;
	 	for (var i = 0; i < squareDOM.children().length; i++) {
	 		var id = squareDOM.children()[i].id;
	 		if(id !== pieceID) {
	 			capturedPiece = chess.getPiece(id);
	 		}
	 	}

	 	if (capturedPiece.color === 'white') {
	 		for (var i = 0; i < this.whitePieces.length; i++) {
	 			if (capturedPiece.id === this.whitePieces[i].id) {
	 				this.whitePieces.splice(i,1);
	 				$('#'+capturedPiece.id).remove();
	 			}
	 		}
	 		this.whitePiecesCaptured.push(capturedPiece);
	 	} else {
	 		for (var i = 0; i < this.blackPieces.length; i++) {
	 			if (capturedPiece.id === this.blackPieces[i].id) {
	 				this.blackPieces.splice(i,1);
	 				$('#'+capturedPiece.id).remove();
	 			}
	 		}
	 		this.blackPiecesCaptured.push(capturedPiece);
	 	}
	 },

	 checkValidMove: function(id,squareID) {
	 	var piece = this.getPiece(id);
	 	var validFlag = false;
	 	piece.moveArray.forEach((square) => {
	 		if (square.name === squareID) {
	 			validFlag = true;
	 		}
	 	});

	 	piece.captureArray.forEach((square) => {
	 		if (square.name === squareID) {
	 			validFlag = true;
	 		}
	 	});
	 	return validFlag;
	 },

	 checkValidCapture: function(id,squareID) {
	 	var piece = this.getPiece(id);
	 	var validFlag = false;

	 	piece.captureArray.forEach((square) => {
	 		if (square.name === squareID) {
	 			validFlag = true;
	 		}
	 	});
	 	return validFlag;
	 }
} //chess object




function Piece(color,type,startingSquare) {
	var pieceTypeSymbol;
	switch(type.toLowerCase()) {
		case 'pawn':
			pieceTypeSymbol='P'
			break;
		case 'knight':
			pieceTypeSymbol='N'
			break;
		case 'bishop':
			pieceTypeSymbol='B'
			break;
		case 'rook':
			pieceTypeSymbol='R'
			break;
		case 'king':
			pieceTypeSymbol='K'
			break;
		case 'queen':
			pieceTypeSymbol='Q'
			break;
		default:
			pieceTypeSymbol=type.toUpperCase();
	} //switch(str.toLowerCase(typee)) {

	this.type = pieceTypeSymbol;

	var pieceColorSymbol;
	switch(color.toLowerCase()) {
		case 'white':
			pieceColorSymbol='w'
			break;
		case 'black':
			pieceColorSymbol='b'
			break;
		default:
			pieceColorSymbol=color.toLowerCase();
	}
	var id = pieceColorSymbol+pieceTypeSymbol+startingSquare.charAt(0);
	this.id = id;
	
	var charSymbol = chess.pieceCharacterHelper[pieceColorSymbol][pieceTypeSymbol];
	this.pieceSymbol = charSymbol;

	this.color = color;

	this.startingSquare = startingSquare;

	var position = new Move(0,0);
	position.setRowRank(startingSquare);
	this.position = location;

	this.captureArray = [];
	this.moveArray = [];

	this.updatePosition = function() {
		var squareID = $('#'+this.id).parent().attr('id')
		var location = new Move(0,0);
		location.setRowRank(squareID);
		this.position = location;
	}

	this.updateMoves = function() {
		this.updatePosition();
		var row = this.position.row;
		var rank = this.position.rank;

		var newRow
		var newRank

		var moveArray = [];
		var captureArray = [];
		var color = this.color;

		switch(this.type) {
			case 'P':
				var direction;
				if (this.color === 'white') {
					direction = 1;
				} else {
					direction = -1;
				}

				//Move
				newRow = row + 1*direction;
				newRank = rank

				if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
					
				} else {
					var move = new Move(newRank,newRow);

					if (move.has() === 'empty') {
						moveArray.push(move);
					}
				}

				if (this.startingSquare === this.position.name) {
					newRow = row + 2*direction;
					newRank = rank

					if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
						
					} else {
						var move = new Move(newRank,newRow);

						if (move.has() === 'empty') {
							moveArray.push(move);
						}
					}
				}

				//Captures
				newRow = row+1*direction;
				newRank = rank+1*direction;

				if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
					
				} else {
					var move = new Move(newRank,newRow);
					if (move.has() === 'empty') {
						
					} else if (move.has() === color) {
						
					} else {
						captureArray.push(move);
					} //if
				}
				
				newRow = row+1;
				newRank = rank-1;

				if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
					
				} else {
					var move = new Move(newRank,newRow);

					if (move.has() === 'empty') {
						
					} else if (move.has() === color) {
						
					} else {
						captureArray.push(move);
					} //if
				}

				this.moveArray = moveArray;
				this.captureArray = captureArray;
				break;
			case 'R':
				var xDir;
				var yDir;

				var nRanks = 8;

				var directionShift = [1,-1, 0];
				for (var x=0; x< directionShift.length; x++) {
					for (var y=0; y< directionShift.length; y++) {
						xDir = directionShift[x];
						yDir = directionShift[y];

						if ((xDir ===0) && (yDir ===0)) {
							continue;
						} else if ((xDir !==0) && (yDir !==0)) {
							continue;
						}

						for (var n=1; n<nRanks; n++) {					//start index from 1, since 0 means no new move
							iShift = n*xDir;
							jShift = n*yDir;

							newRow = row + iShift;
							newRank = rank + jShift;

							if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
								continue;
							}

							var move = new Move(newRank,newRow);

							if (move.has() === 'empty') {
								moveArray.push(move);
							} else if (move.has() === color) {
								break;
							} else {
								captureArray.push(move);
								break;
							} //if
						} //for nRanks
					} //for yDir
				} //for xDir
				this.moveArray = moveArray;
				this.captureArray = captureArray;
				break;
			case 'N':
				var arrayShift = [2,-2,1,-1]
				for (var i=0; i< arrayShift.length; i++) {
					for (var j=0; j<arrayShift.length; j++) {
						iShift = arrayShift[i];
						jShift = arrayShift[j];
						if (Math.abs(iShift) === Math.abs(jShift)) {
							continue;
						} else {
							newRow = row + iShift;
							newRank = rank + jShift;

							if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
								continue;
							}

							var move = new Move(newRank,newRow);

							if (move.has() === 'empty') {
								moveArray.push(move);
							} else if (move.has() === color) {

							} else {
								captureArray.push(move);
							}
						}
					} //for j
				} // for i
				this.moveArray = moveArray;
				this.captureArray = captureArray;
				break;
			case 'K':
				var xDir;
				var yDir;

				var nRanks = 8;

				var directionShift = [1,-1, 0];
				for (var x=0; x< directionShift.length; x++) {
					for (var y=0; y< directionShift.length; y++) {
						xDir = directionShift[x];
						yDir = directionShift[y];

						if ((xDir ===0) && (yDir ===0)) {
							continue;
						}
						iShift = xDir;
						jShift = yDir;

						newRow = row + iShift;
						newRank = rank + jShift;

						if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
							continue;
						}

						var move = new Move(newRank,newRow);

						if (move.has() === 'empty') {
							moveArray.push(move);
						} else if (move.has() === color) {
							
						} else {
							captureArray.push(move);
							
						} //if
					} //for yDir
				} //for xDir
				this.moveArray = moveArray;
				this.captureArray = captureArray;

				break;
			case 'Q':
				var xDir;
				var yDir;

				var nRanks = 8;

				var directionShift = [1,-1, 0];
				for (var x=0; x< directionShift.length; x++) {
					for (var y=0; y< directionShift.length; y++) {
						xDir = directionShift[x];
						yDir = directionShift[y];

						if ((xDir ===0) && (yDir ===0)) {
							continue;
						}

						for (var n=1; n<nRanks; n++) {					//start index from 1, since 0 means no new move
							iShift = n*xDir;
							jShift = n*yDir;

							newRow = row + iShift;
							newRank = rank + jShift;

							if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
								continue;
							}

							var move = new Move(newRank,newRow);

							if (move.has() === 'empty') {
								moveArray.push(move);
							} else if (move.has() === color) {
								break;
							} else {
								captureArray.push(move);
								break;
							} //if
						} //for nRanks
					} //for yDir
				} //for xDir
				this.moveArray = moveArray;
				this.captureArray = captureArray;
				break;
			case 'B':
				var xDir;
				var yDir;

				var nRanks = 8;

				var directionShift = [1,-1];
				for (var x=0; x< directionShift.length; x++) {
					for (var y=0; y< directionShift.length; y++) {
						xDir = directionShift[x];
						yDir = directionShift[y]

						for (var n=1; n<nRanks; n++) {					//start index from 1, since 0 means no new move
							iShift = n*xDir;
							jShift = n*yDir;

							newRow = row + iShift;
							newRank = rank + jShift;

							if ((newRow < 1) || (newRank < 1) || (newRow > 8) || (newRank >8)) {
								continue;
							}

							var move = new Move(newRank,newRow);

							if (move.has() === 'empty') {
								moveArray.push(move);
							} else if (move.has() === color) {
								break;
							} else {
								captureArray.push(move);
								break;
							} //if
						} //for nRanks
					} //for yDir
				} //for xDir
				this.moveArray = moveArray;
				this.captureArray = captureArray;
				break;
			} //switch case
		} //function

	var pieceHTML = $("<div>");
	pieceHTML.attr("id",id);
	pieceHTML.addClass("piece");
	pieceHTML.text(charSymbol);

	var squareDOM = "#"+ startingSquare;
	$(squareDOM).append(pieceHTML);
} //function Piece constructor





function Move(rank,row) {
	this.rank = rank;
	this.row = row;
	this.name = String.fromCharCode(96 + rank)+row;
	this.setRowRank = function(name) {
		this.name = name;
		this.row = parseInt(name.charAt(1));
		this.rank = parseInt(chess.rankToNumberHelper[name.charAt(0)]);
	};
	this.isEmpty = function() {
		if ($('#'+this.name).children().length === 0) {
			return true;
		} else {
			return false;
		}
	}; //isEmpty function

	this.hasBlack = function() {
		var childID;
		var childColor;
		if ($('#'+this.name).children().length === 0) {
			return false;
		} else {
			childID = $('#'+this.name).children()[0].id;
			childColor = childID.charAt(0);
			if (childColor === 'b') {
				return true;
			} else {
				return false;
			}
		}
	}; //hasBlack function

	this.hasWhite = function() {
		var childID;
		var childColor;
		if ($('#'+this.name).children().length === 0) {
			return false;
		} else {
			childID = $('#'+this.name).children()[0].id;
			childColor = childID.charAt(0);
			if (childColor === 'w') {
				return true;
			} else {
				return false;
			}
		}
	}; //hasBlack function

	this.has = function() {
		var childID;
		var childColor;
		if ($('#'+this.name).children().length === 0) {
			return 'empty';
		} else {
			childID = $('#'+this.name).children()[0].id;
			childColor = childID.charAt(0);
			if (childColor === 'w') {
				return 'white';
			} else {
				return 'black';
			}
		}
	}; //hasBlack function
}
