var rodada = 1;
var matriz_game = Array(3);

matriz_game['a'] = Array(3);
matriz_game['b'] = Array(3);
matriz_game['c'] = Array(3);

matriz_game['a'][1] = 0;
matriz_game['a'][2] = 0;
matriz_game['a'][3] = 0;

matriz_game['b'][1] = 0;
matriz_game['b'][2] = 0;
matriz_game['b'][3] = 0;

matriz_game['c'][1] = 0;
matriz_game['c'][2] = 0;
matriz_game['c'][3] = 0;


$(document).ready(function(){

	$('#btn_start').click(function(){
		if($('#input_jogador1').val() == ''){
			return false;
		}
		if($('#input_jogador2').val() == ''){
			return false;
		}

		$('#output_jogador1').html($('#input_jogador1').val());
		$('#output_jogador2').html($('#input_jogador2').val());

		$('#page_init').hide();
		$('#page_game').show();
	});

	$('.jogada').click(function(){

		var id_campo = this.id;
		//elimina as funcioes click() não entendi bem!wh
		$('#'+id_campo).off();
		jogada(id_campo);

	});

	function jogada(id){

		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1){
			icone = "url('imagens/marcacao_1.png')";
			ponto = -1;
		}else{
			icone = "url('imagens/marcacao_2.png')";
			ponto = 1;
		}

		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-');

		matriz_game[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();
	}

	function verifica_combinacao(){
		// h
		var pontos = 0;
		for (var i = 0; i <= 3; i++) {
			pontos += matriz_game['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 0; i <= 3; i++) {
			pontos += matriz_game['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 0; i <= 3; i++) {
			pontos += matriz_game['c'][i];
		}
		ganhador(pontos);
		
		//vertical
		pontos = 0;
		for (var v = 0; v <= 3; v++) {
			pontos = 0;
			pontos += matriz_game['a'][v];
			pontos += matriz_game['b'][v];
			pontos += matriz_game['c'][v];
			ganhador(pontos);
		}

		//diagonal

		pontos = 0;
		pontos = matriz_game['a'][1] + matriz_game['b'][2] + matriz_game['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_game['a'][3] + matriz_game['b'][2] + matriz_game['c'][1];
		ganhador(pontos);




	}

	function ganhador(pontos){
		if(pontos == -3){
			var jogada_1 = $('#input_jogador1').val();
			alert(jogada_1 + ' é o vencedor');
			//off() remove a propriedade de adicionar com o click()
			$('.jogada').off();
		}else if(pontos == 3){
			var jogada_2 = $('#input_jogador2').val();
			alert(jogada_2 + ' é o vencedor');
			$('.jogada').off();
		}
	}

});