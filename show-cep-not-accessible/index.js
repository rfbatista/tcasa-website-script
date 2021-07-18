let tabela = document.getElementsByClassName('table table-striped product-delivery-table')[0]
let tabelaCompra = document.getElementById('frete-opcoes');

function foundInProductPage(){
	if(document.getElementsByClassName('frete-prazoEntrega')[0]){
		let timeDeliver = document.getElementsByClassName('frete-prazoEntrega')[0]
		timeDeliver.childNodes[0].nodeValue = ' '
	}
	if(document.getElementsByClassName('frete-valor')[0]){
		let valueDeliver = document.getElementsByClassName('frete-valor')[0]
		valueDeliver.childNodes[0].nodeValue = ' '
	}
	return;
}

function foundInCheckoutPage(){
	if(document.getElementsByClassName('frete-prazo')[0]){
		let timeDeliver = document.getElementsByClassName('frete-prazo')[0]
		timeDeliver.childNodes[0].nodeValue = ' '
	}
	if(document.getElementsByClassName('frete-valor')[0]){
		let valueDeliver = document.getElementsByClassName('frete-valor')[0]
		valueDeliver.childNodes[0].nodeValue = ' '
	}
	return;
}

function CepNotAvailable(nodes) {
	let temp = false;
	return nodes.childNodes.forEach(node => {
		if (node.textContent === 'NÃO ENTREGAMOS') {
			temp = true;
			foundInProductPage()
		}
		if(node.firstElementChild){
			if(node.firstElementChild.textContent === 'NÃO ENTREGAMOS'){
				temp = true;
				foundInCheckoutPage()
			}
			if(node.getElementsByClassName('tolltip')[0]){
				let tolltip = node.getElementsByClassName('tolltip')[0]
				tolltip.remove()
			}
		}
		if(temp){
			window.alert('Não existe modalidade de entrega desse produto para esta região. Caso queira contratar uma transportadora, por favor marcar a opção retira na loja.')
			temp = false;
		}
	})
}

var observer = new MutationObserver(function (mutations) {
	
	let tolltip = document.querySelector('span[data-original-title="Opção sugerida como frete."]')
	if(tolltip){
		tolltip.remove()
	}
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(node => {
			if (node.nodeName === 'TR') {
				CepNotAvailable(node)
			}
			if(node.nodeName === 'DIV'){
				CepNotAvailable(node)
			}
		})
	});
});

var config = { attributes: true, childList: true, characterData: true, subtree: true };
if(tabela && tabela.nodeType){
	observer.observe(tabela, config);
}
if(tabelaCompra && tabelaCompra.nodeType){
	observer.observe(tabelaCompra, config);
}