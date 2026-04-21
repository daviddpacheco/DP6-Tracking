Case Técnico DP6 - Documentação de Tagueamento
Este documento detalha a implementação da camada de dados e do rastreamento de eventos para o Case Técnico da DP6. Toda a solução foi desenvolvida em Vanilla JavaScript, visando alta performance e independência de bibliotecas externas para a coleta básica.

🚀 Destaques da Implementação
1. Rastreamento Escalável de Interface (Menu e Cards)
Diferente de um mapeamento estático de botões, foi implementada uma lógica de delegação de eventos utilizando o método .closest().

Escopo Ampliado: Em vez de taguear apenas os botões solicitados, a solução cobre todo o menu de navegação e a seção de cards de análise.

Escalabilidade: A arquitetura baseada em data-attributes permite que novos itens sejam adicionados ao menu no futuro e sejam rastreados automaticamente, sem a necessidade de novas linhas de código JavaScript.

2. Fábricas de Dados Padronizadas
Foram criadas duas funções motoras para garantir a consistência dos dados enviados ao GTM:

disparoClick: Responsável por interações simples (Menu e Cards).

disparoForm: Especializada na coleta de dados de formulário, capturando id, name, action e o texto do botão de submissão de forma organizada.

3. Rastreamento de Conversão via MutationObserver
Para o monitoramento da exibição do modal de sucesso, foi utilizada a API nativa MutationObserver.

Precisão Cirúrgica: Esta técnica monitora alterações na classe do <body> (lightbox-open), garantindo que o evento de visualização (view_modal) seja disparado apenas quando o modal está visualmente disponível para o usuário, independentemente de tempos de carregamento ou latência do servidor.

🔍 Observações Técnicas e Auditoria (QA)
Durante o desenvolvimento, foi realizada uma auditoria no ambiente do Google Analytics 4 (G-096NHNN8Q2), identificando um ponto crucial para a governança de dados:

Conflito com Medição Otimizada (Enhanced Measurement):
A propriedade de destino está com a Medição Otimizada ativa na interface do GA4. Isso gera disparos automáticos nativos do Google que conflitam com este tagueamento customizado nos seguintes pontos:

Downloads: O evento file_download é disparado automaticamente.

Formulários: O GA4 nativo tenta capturar form_start e form_submit.

Cliques Externos: O evento click (Outbound) é gerado pelo Google.

Decisão de Projeto: Mantive a implementação customizada via dataLayer.push em todos os elementos para demonstrar o controle total sobre a taxonomia dos dados. Como boa prática de consultoria, recomenda-se que, em ambiente de produção, essas chaves de medição automática sejam desativadas no painel administrativo do GA4, priorizando a camada de dados proprietária aqui desenvolvida para maior fidelidade das métricas.
