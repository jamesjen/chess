

chess.createBoard();
$("#container").append(chess.board);
chess.setupBoardPieces();

/*
TO-DO:

Pick-up Piece:
- Check if piece is your color

Drop piece:
- Check if dropped square is in move, if it is move
- Check if dropped square is in capture
    - If so, remove captured piece and store in captured array
    - Move to square
- Updateboard board
*/

/*

capture(position {
	//use position to find the id of the captured piece
	//using id, loop through the blackPieces or whitePieces array. If match, remove the element from array and moved into capture array
})




*/
