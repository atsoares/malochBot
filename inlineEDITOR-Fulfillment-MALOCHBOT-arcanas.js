// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs

// for Dialogflow fulfillment library docs, samples, and to report issues

'use strict';

const functions = require('firebase-functions');

const {WebhookClient, Image, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const CHECARBUILD_INTENT = 'checarBuild';
const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';

////////////////////////////////////////////////////////////////////
//                   URL de todas as builds                       //
////////////////////////////////////////////////////////////////////

const AIRI_LANE_URL           = 'https://i.imgur.com/U0ez7ul.jpg';
const AIRI_JG_URL             = 'https://i.imgur.com/fPtlLGA.jpg';
const ALEISTER_URL            = 'https://i.imgur.com/RnrDpr0.jpg';
const ALEISTER_2_URL          = 'https://imgur.com/RhL1pnj.jpg';
const ALICE_URL               = 'https://i.imgur.com/SIOWB7C.jpg';
const ALICE_2_URL             = 'https://i.imgur.com/mX6o3bY.jpg';
const AMILY_URL               = 'https://imgur.com/0HrQnNr.jpg';
const AMILY_JG_URL            = 'https://imgur.com/8f6LPRf.jpg';
const ANNETE_URL              = 'https://imgur.com/vugGM4U.jpg';
const ANNETE_2_URL            = 'https://imgur.com/Rrde3p5.jpg';
const ANNETE_3_URL            = 'https://imgur.com/a1qj9Aa.jpg';
const ARDUIN_URL              = 'https://imgur.com/qaEbbY0.jpg';
const ARTHUR_URL              = 'https://imgur.com/Lt4u18a.jpg';
const ARUM_SOLO_URL           = 'https://imgur.com/kau4e65.jpg';
const ARUM_SUPORTE_URL        = 'https://imgur.com/SFmP2ST.jpg';
const ASTRID_URL              = 'https://imgur.com/hOgNLiF.jpg';
const ASTRID_JG_URL           = 'https://imgur.com/EJcDD5W.jpg';
const AZZENKA_URL             = 'https://imgur.com/QnyDNsi.jpg';
const BALDUM_URL              = 'https://imgur.com/7jMf2n7.jpg';
const BALDUM_2_URL            = 'https://imgur.com/tHEMoGz.jpg';
const BALDUM_SOLO_URL         = 'https://imgur.com/tLQjb78.jpg';
const BATMAN_URL              = 'https://imgur.com/jUjPPns.jpg';
const BUTTERFLY_AD_URL        = 'https://imgur.com/Uu5PMbN.jpg';
const BUTTERFLY_TANK_URL      = 'https://imgur.com/wathWg2.jpg';
const CAPHENY_URL             = '';
const CHAUGNAR_AP_URL         = 'https://imgur.com/t1DegVc.jpg';
const CHAUGNAR_TANK_URL       = 'https://imgur.com/ttaxPaS.jpg';
const CRESHT_SOLO_URL         = 'https://i.imgur.com/7LBcLt1.jpg';
const CRESHT_SUPORTE_URL      = 'https://i.imgur.com/ENQPAJs.jpg';
const DARCY_MID_URL           = 'https://i.imgur.com/rTtpWeP.jpg';
const DARCY_MID_2_URL         = 'https://i.imgur.com/jxnJDjG.jpg';
const DARCY_JG_URL            = 'https://i.imgur.com/ht4eUC2.jpg';
const DIAOCHAN_MID_URL        = 'https://i.imgur.com/TD4SJKh.jpg';
const DIAOCHAN_SUP_URL        = 'https://i.imgur.com/GFCHu1t.jpg';
const ELSU_URL                = 'https://i.imgur.com/I7InEQ0.jpg';
const ERROL_URL               = '';
const FENNIK_URL              = 'https://imgur.com/KLhS9S4.jpg';
const FENNIK_2_URL            = 'https://imgur.com/BVUKQz3.jpg';
const FLORENTINO_URL          = 'https://i.imgur.com/hHPwhJp.jpg';
const FLORENTINO_JG_URL       = 'https://i.imgur.com/wxZjp2L.jpg';
const GILDUR_AP_URL           = 'https://i.imgur.com/GE2Laoq.jpg';
const GILDUR_SUPORTE_URL      = 'https://i.imgur.com/EpLwARh.jpg';
const GRAKK_URL               = 'https://i.imgur.com/dq8Fg49.jpg';
const HAYATE_JG_1_URL         = 'https://i.imgur.com/lRN58eR.jpg';
const HAYATE_JG_2_URL         = 'https://i.imgur.com/8I25sn9.jpg';
const HAYATE_LANE_URL         = 'https://i.imgur.com/fKzptzn.jpg';
const IGNIS_URL               = 'https://i.imgur.com/Py4TI4b.jpg';
const ILUMIA_URL              = 'https://imgur.com/plkKEGm.jpg';
const ILUMIA_2_URL            = 'https://imgur.com/zwh85GH.jpg';
const JINNAR_URL              = 'https://i.imgur.com/iyrozwe.jpg';
const KAHLII_URL              = 'https://i.imgur.com/xvVwP4v.jpg';
const KILGROTH_URL            = 'https://i.imgur.com/aZIJI8i.jpg';
const KRIKNAK_URL             = 'https://i.imgur.com/i0fLrfP.jpg';
const KRIXI_URL               = 'https://i.imgur.com/QISvmts.jpg';
const LAURIEL_URL             = 'https://i.imgur.com/lXwArqD.jpg';
const LAURIEL_TANK_URL        = 'https://i.imgur.com/4i9CZ1c.jpg';
const LILIANA_URL             = 'https://i.imgur.com/bxJ9I6I.jpg';
const LINDIS_URL              = 'https://imgur.com/kzntH2W.jpg';
const LINDIS_LANE_URL         = 'https://imgur.com/V63M7uP.jpg';
const LUBU_URL                = 'https://i.imgur.com/kzD5VcE.jpg';
const LUMBURR_URL             = 'https://i.imgur.com/Ucm846n.jpg';
const MALOCH_URL              = 'https://imgur.com/3zaHkjV.jpg';
const MALOCH_2_URL            = 'https://imgur.com/IhehADA.jpg';
const MARJA_URL               = 'https://i.imgur.com/4gcbtvv.jpg';
const MAX_URL                 = 'https://i.imgur.com/RLmCJgD.jpg';
const MAX_2_URL               = 'https://i.imgur.com/zln8rmm.jpg';
const MGANGA_URL              = 'https://i.imgur.com/a06ih8X.jpg';
const MINA_URL                = 'https://imgur.com/IcjaknD.jpg';
const MINA_2_URL              = 'https://imgur.com/2vOyZWc.jpg';
const MOREN_URL               = 'https://imgur.com/qc4f9q4.jpg';
const MOREN_JG_URL            = 'https://imgur.com/f5hFynP.jpg';
const MOREN_JG_2_URL          = 'https://imgur.com/mOeH0Gf.jpg';
const MURAD_URL               = 'https://i.imgur.com/ydMPPht.jpg';
const NAKROTH_URL             = 'https://i.imgur.com/21TVzKd.jpg';
const NATALYA_URL             = 'https://i.imgur.com/nAmInZD.jpg';
const OMEGA_URL               = 'https://i.imgur.com/aRQ8Fv0.jpg';
const OMEN_URL                = 'https://imgur.com/NUjaJmb.jpg';
const OMEN_2_URL              = 'https://imgur.com/V91Q13e.jpg';
const ORMARR_URL              = 'https://i.imgur.com/9NlNyEG.jpg';
const PEURA_URL               = 'https://i.imgur.com/cNEGBit.jpg';
const PREYTA_URL              = 'https://i.imgur.com/RJycCsJ.jpg';
const QUILLEN_URL             = 'https://i.imgur.com/2JsprXf.jpg';
const RAZ_URL                 = 'https://imgur.com/ZeNi6Vz.jpg';
const RAZ_JG_URL              = 'https://imgur.com/ln9koiI.jpg';
const RIKTOR_SOLO_URL         = 'https://i.imgur.com/KNyNiAf.jpg';
const RIKTOR_ROAM_URL         = 'https://i.imgur.com/R0jrhp7.jpg';
const RIKTOR_ROAM_2_URL       = 'https://imgur.com/Le9Z5Bb.jpg';
const ROURKE_URL              = 'https://imgur.com/ZOMLOuM.jpg';
const ROURKE_2_URL            = 'https://imgur.com/mTuebAr.jpg';
const ROXIE_FLICK_URL         = 'https://imgur.com/XzGu5KC.jpg';
const ROXIE_PUNIR_URL         = 'https://imgur.com/AqQA6Dw.jpg';
const ROXIE_PUNIR_2_URL       = 'https://imgur.com/RXgax5k.jpg';
const RYOMA_JG_URL            = 'https://imgur.com/4bIANTp.jpg';
const RYOMA_SOLO_URL          = 'https://imgur.com/cKMerT9.jpg';
const SEPHERA_URL             = 'https://imgur.com/LhaXwLU.jpg';
const SEPHERA_ROAM_URL        = 'https://imgur.com/yqRcbCP.jpg';
const SKUD_URL                = 'https://i.imgur.com/sTtzVtd.jpg';
const SLIMZ_JG_URL            = 'https://i.imgur.com/PLXg08c.jpg';
const SLIMZ_LANE_URL          = 'https://i.imgur.com/Lcs4CYp.jpg';
const SUPERMAN_ROAM_URL       = 'https://imgur.com/J4UeosA.jpg';
const SUPERMAN_SOLO_URL       = 'https://imgur.com/TrWBnMn.jpg';
const SUPERMAN_SOLO_2_URL     = 'https://imgur.com/h3kB7fJ.jpg';
const TAARA_URL               = 'https://i.imgur.com/ca4K1GO.jpg';
const TEEMEE_URL              = 'https://imgur.com/PzXFzbO.jpg';
const TEEMEE_2_URL            = 'https://imgur.com/dyvQXvJ.jpg';
const TELANNAS_URL            = 'https://imgur.com/6aRB2ok.jpg';
const TELANNAS_2_URL          = 'https://imgur.com/rUQdHim.jpg';
const THANE_URL               = 'https://i.imgur.com/7zTDTrK.jpg';
const THEFLASH_URL            = 'https://imgur.com/3otodjV.jpg';
const THEFLASH_2_URL          = 'https://imgur.com/wiqOFqX.jpg';
const THEFLASH_3_URL          = 'https://imgur.com/WW6elvC.jpg';
const THEJOKER_URL            = 'https://i.imgur.com/R31ot9z.jpg';
const TORO_URL                = '';
const TULEN_URL               = 'https://i.imgur.com/4iSTsCI.jpg';
const TULEN_JUNGLE_URL        = 'https://i.imgur.com/KQzwd0q.jpg';
const VALHEIN_URL             = 'https://imgur.com/vjUCqAV.jpg';
const VALHEIN_2_URL           = 'https://imgur.com/ZDKaAo4.jpg';
const VEERA_URL               = 'https://i.imgur.com/qPHPK8E.jpg';
const VERES_URL               = 'https://i.imgur.com/9yN7ZAu.jpg';
const VERES_TANK_URL          = 'https://i.imgur.com/IjqyeDf.jpg';
const VIOLET_LANE_URL         = 'https://i.imgur.com/XAIKkh3.jpg';
const VIOLET_JG_URL           = 'https://i.imgur.com/o656Gox.jpg';
const WIRO_URL                = 'https://i.imgur.com/nyrfGNA.jpg';
const WISP_URL                = 'https://imgur.com/WbOgG6K.jpg';
const WISP_JG_URL             = 'https://imgur.com/gdHgZb5.jpg';
const WONDERWOMAN_URL         = 'https://i.imgur.com/n8eVNAR.jpg';
const WUKONG_URL              = 'https://i.imgur.com/LiWNnBK.jpg';
const XENIEL_URL              = 'https://i.imgur.com/hxaIr60.jpg';
const YBNETH_URL              = 'https://imgur.com/0KSqHOr.jpg';
const YBNETH_SOLO_URL         = 'https://imgur.com/ZMFe8ge.jpg';
const YORN_URL                = 'https://i.imgur.com/lr5DiJi.jpg';
const ZANIS_URL               = 'https://i.imgur.com/jtraB2D.jpg';
const ZANIS_OFF_TANKURL       = 'https://i.imgur.com/SbYtVUR.jpg';
const ZEPHYS_AD_URL           = 'https://i.imgur.com/NJGs43s.jpg';
const ZEPHYS_TANK_URL         = 'https://i.imgur.com/V5ocM82.jpg';
const ZILL_URL                = 'https://i.imgur.com/RC62pgL.jpg';
const ZUKA_URL                = 'https://i.imgur.com/93Hu2Jl.jpg';

////////////////////////////////////////////////////////////////////
//                   Lista de Roles por Heroi                     //
////////////////////////////////////////////////////////////////////

const HEROIS_SOLO     = ["Florentino", "Riktor", "Maloch", "Marja", "Superman", "Xeniel", "Omen", "YBneth", "Cresht", 
                        "Ryoma", "Max", "Arum", "Wonder Woman", "Skud", "Airi", "Roxie", "Amily", "LuBu", "Zephys", 
                        "Arduin", "Rourke", "Zuka", "Baldum", "Arthur", "Omega", "KilGroth", "Zanis", "Gildur", 
                        "Wukong", "Astrid", "Taara", "Veres", "Valhein"];

const HEROIS_LANE     = ["Elsu", "TelAnnas", "Valhein", "TheJoker", "Yorn", "Wisp", "Lindis", "Violet", "Fennik", "Moren", "Hayate"];

const HEROIS_MID      = ["Elsu", "Sephera", "Tulen", "Liliana", "Raz", "Ignis", "Natalya", "TheFlash", "Kahlii", "Lauriel", 
                        "Aleister", "Ilumia", "Jinnar", "Mganga", "Krixi", "Diaochan", "Preyta", "Gildur", "Veera", "Azzenka", 
                        "Annette", "Darcy"];

const HEROIS_SUPORTE  = ["Annette", "YBneth", "Gildur", "TeeMee", "Baldum", "Sephera", "Peura", "Mina", "Grakk", "Chaugnar", "Alice",
                        "Arum", "Thane", "Ormarr", "Cresht", "Riktor", "Xeniel", "Lumburr", "Arduin", "Superman", "Aleister", "Diaochan"];

const HEROIS_JUNGLE   = ["Lindis", "Rourke", "Quillen", "Violet", "Nakroth", "Zephys", "Murad", "Elsu", "Kriknak", "Zill", 
                        "Slimz", "Ryoma", "Moren", "Zanis", "Wukong", "Wisp", "Fennik", "Butterfly", "Tulen", "Raz", "Batman", 
                        "Wonder Woman", "Astrid", "Airi", "Amily", "Zuka", "Florentino", "Darcy", "Hayate"];

const talento_flick              = '';
const talento_punir              = '';
const talento_curar              = '';
const talento_executar           = '';
const talento_inativarTorre      = '';

////////////////////////////////////////////////////////////////////
//                    TESTE de Herois Objeto                      //
////////////////////////////////////////////////////////////////////

const AIRI_META = {
  "heroi" : "Airi",
  "meta" : {
    "builds" : { 
      "Solo" : { 
        "properties" : {
          "build_url": { "1" : AIRI_LANE_URL },
          "dicas": { "1" : "blablabla", "2" : "blablabla", "3" : "blablabla" },
          "talentos": { "1" : talento_executar},
          "arcana": {"vermelha": "", "roxa": "", "verde":""}
        }
      },
      "Jungle" : { 
        "properties" : {
          "build_url": { "1" : AIRI_LANE_URL },
          "dicas": { "1" : "blablabla", "2" : "blablabla", "3" : "blablabla" },
          "talentos": { "1" : talento_punir},
          "arcana": {"vermelha": "", "roxa": "", "verde":""}
        }
      },
    },
    "arcanas" : {
      "listas" : [{"vermelha": "", "roxa": "", "verde":""}, {"vermelha": "", "roxa": "", "verde":""}],
      "opcional" : [{"vermelha": "", "roxa": "", "verde":""}],
    }
  }
};

////////////////////////////////////////////////////////////////////
//                     Lista de falas padrão                      //
////////////////////////////////////////////////////////////////////

const SIMBOLOS = ["+", "^", "#", "~"];
const FUNCAO_ERRADA_1 = "Poxa, achei que você não era troll...";
const FUNCAO_ERRADA_2 = "Mas infelizmente você é :(";
const BUILD_EM_BREVE = "Me pergunta depois, nesse momento to pesquisando novas builds para esse herói!";

////////////////////////////////////////////////////////////////////
//                     Lista de itens ImgURL                      //
////////////////////////////////////////////////////////////////////

const BOOTS           = 'https://imgur.com/rxJmTBB.jpg';
const SONIC_BOOTS     = 'https://imgur.com/bCOC3AG.jpg';
const GILDED_BOOTS    = 'https://imgur.com/EB648Wi.jpg';
const FLASHY_BOOTS    = 'https://imgur.com/4gLngtp.jpg';
const ENCHANTED_BOOTS = 'https://imgur.com/gj4Pkpx.jpg';
const WAR_BOOTS       = 'https://imgur.com/Ur0x0Fv.jpg';
const HERMES_BOOTS    = 'https://imgur.com/Iq9RbZZ.jpg';

////////////////////////////////////////////////////////////////////
//                     Lista de memes ImgURL                      //
////////////////////////////////////////////////////////////////////

const TRISTE_URL         = '';

const FELIZ_URL          = '';

const CONCLUIDO          = '';

////////////////////////////////////////////////////////////////////
//              Lista de Ultimas Builds Adicionadas 08/03/2018    //
////////////////////////////////////////////////////////////////////

const ULTIMASBUILDS_1 = "Airi, Alice, Aleister, Amily, Annette, Baldum, D´Arcy, Fennik, Florentino, Hayate, Ilumia, Lauriel, Lindis, Maloch, Max, Mina, Moren, Omen, Raz, Riktor, Rourke, Roxie, Ryoma, Sephera, Superman, TeeMee, Tel´Annas, The Flash, Tulen, Valhein, Wisp e Y´Bneth";
const ULTIMASBUILDS_2 = "";
const ULTIMASBUILDS_3 = "";


////////////////////////////////////////////////////////////////////
//                      Lista de ARCANAS                          //
////////////////////////////////////////////////////////////////////

const ARCANA_RED_ILUMINACAO        = {"nome" : "Iluminação", "Atributos" : "Poder de Habilidade +5.3"};
const ARCANA_RED_OBLITERACAO       = {"nome" : "Obliteração", "Atributos" : "Dano de Ataque +3.2"};
const ARCANA_RED_MASSACRE          = {"nome" : "Massacre", "Atributos" : "Dano de Ataque +2, Perfuração de Armadura +3.6"};
const ARCANA_RED_SEDEDESANGUE      = {"nome" : "Sede de Sangue", "Atributos" : "Dano de Ataque +2.5, Roubo de Vida +0.5%"};
const ARCANA_RED_DESCONTROLE       = {"nome" : "Descontrole", "Atributos" : "Taxa Crítica +0.7%, Dano Crítico +3.6%"};
const ARCANA_RED_INDOMAVEL         = {"nome" : "Indomável", "Atributos" : "Velocidade de Ataque +1%, Vida Máxima +33.7, Armadura +2.3"};
const ARCANA_RED_VIOLACAO          = {"nome" : "Violação", "Atributos" : "Poder de Habilidade +4.2, Perfuração Mágica +2.4"};
const ARCANA_RED_CONJURACAO        = {"nome" : "Conjuração", "Atributos" : "Poder de Habilidade +4.2, Velocidade de Ataque +0.6%"};
const ARCANA_RED_ATROCIDADE        = {"nome" : "Atrocidade", "Atributos" : "Taxa Crítica +1.6%"};
const ARCANA_RED_BLITZ             = {"nome" : "Blitz", "Atributos" : "Velocidade de Ataque +1.6%, Taxa Crítica +0.5%"};
const ARCANA_RED_LIST              = [ARCANA_RED_ILUMINACAO, ARCANA_RED_OBLITERACAO, ARCANA_RED_MASSACRE, ARCANA_RED_SEDEDESANGUE, ARCANA_RED_DESCONTROLE, ARCANA_RED_INDOMAVEL, ARCANA_RED_VIOLACAO, ARCANA_RED_CONJURACAO, ARCANA_RED_ATROCIDADE, ARCANA_RED_BLITZ];

const ARCANA_PURPLE_COLOSSO        = {"nome" : "Colosso", "Atributos" : "Vida Máxima +75"};
const ARCANA_PURPLE_ORACAO         = {"nome" : "Oração", "Atributos" : "Roubo Mágico de Vida +1.6%"};
const ARCANA_PURPLE_LADRÃO         = {"nome" : "Ladrão", "Atributos" : "Roubo de Vida +1.6%"};
const ARCANA_PURPLE_TIRANIA        = {"nome" : "Tirania", "Atributos" : "Taxa Crítica +0.5%, Vida Máxima +60"};
const ARCANA_PURPLE_IMORTAL        = {"nome" : "Imortal", "Atributos" : "Vida Máxima +60, Vida/5s +4.5"};
const ARCANA_PURPLE_BANQUETE       = {"nome" : "Banquete", "Atributos" : "Roubo de Vida +1%, Defesa Mágica +4.1"};
const ARCANA_PURPLE_MAGIANEGRA     = {"nome" : "Magia Negra", "Atributos" : "Poder de Habilidade +2.4, Roubo Mágico de Vida +1%, Poder de Habilidade +5.3"};
const ARCANA_PURPLE_BENEVOLENCIA   = {"nome" : "Benevolência", "Atributos" : "Vida Máxima +45, Vida/5s +5.2, Velocidade de Movimento +0.4"};
const ARCANA_PURPLE_ASSASSINO      = {"nome" : "Assassino", "Atributos" : "Dano de Ataque +1.6, Velocidade de Movimento +1%"};
const ARCANA_PURPLE_GUERRILHA      = {"nome" : "Guerrilha", "Atributos" : "Velocidade de Ataque +1%, Velocidade de Movimento +1%"};
const ARCANA_PURPLE_LIST           = [ARCANA_PURPLE_COLOSSO, ARCANA_PURPLE_ORACAO, ARCANA_PURPLE_LADRÃO, ARCANA_PURPLE_TIRANIA, ARCANA_PURPLE_IMORTAL, ARCANA_PURPLE_BANQUETE, ARCANA_PURPLE_MAGIANEGRA, ARCANA_PURPLE_BENEVOLENCIA, ARCANA_PURPLE_ASSASSINO, ARCANA_PURPLE_GUERRILHA];

const ARCANA_GREEN_FORTIFICACAO    = {"nome" : "Fortificação", "Atributos" : "Armadura +9"};
const ARCANA_GREEN_ACODURO         = {"nome" : "Aço Duro", "Atributos" : "Armadura +5, Defesa Mágica +5"};
const ARCANA_GREEN_CORAGEM         = {"nome" : "Coragem", "Atributos" : "Vida Máxima +37.5, Redução de Recarga +0.6%"};
const ARCANA_GREEN_PROEZA          = {"nome" : "Proeza", "Atributos" : "Defesa Mágica +9"};
const ARCANA_GREEN_MALDICAO        = {"nome" : "Maldição", "Atributos" : "Poder de Habilidade +2.4, Redução de Recarga +0.7%"};
const ARCANA_GREEN_FERRAO          = {"nome" : "Ferrão", "Atributos" : "Dano de Ataque +0.9, Perfuração de Armadura +6.4"};
const ARCANA_GREEN_AGITACAO        = {"nome" : "Agitação", "Atributos" : "Velocidade de Ataque +0.6%, Perfuração Mágica +6.4"};
const ARCANA_GREEN_FOCO            = {"nome" : "Foco", "Atributos" : "Redução de Recarga +1%"};
const ARCANA_GREEN_CONSUMACAO      = {"nome" : "Consumação", "Atributos" : "Roubo Mágico de Vida +0.7%, Armadura +5.9"};
const ARCANA_GREEN_CRUZADAS        = {"nome" : "Cruzadas", "Atributos" : "Armadura +2.7, Defesa Mágica +2.7, Redução de Recarga +0.6%"};
const ARCANA_GREEN_LIST            = [ARCANA_GREEN_FORTIFICACAO, ARCANA_GREEN_ACODURO, ARCANA_GREEN_CORAGEM, ARCANA_GREEN_PROEZA, ARCANA_GREEN_MALDICAO, ARCANA_GREEN_FERRAO, ARCANA_GREEN_AGITACAO, ARCANA_GREEN_FOCO, ARCANA_GREEN_CONSUMACAO, ARCANA_GREEN_CRUZADAS];



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           GLOSSARIO                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//                               JOGO                             //
////////////////////////////////////////////////////////////////////

const info_AOV = {"termo":"AoV", "definicao":"Uma abreviação do nome Arena of Valor"};
const GLOSSARIO = [];

/////////////////////////////////////////////////////////////////////
//                          Inicio do BOT                          //
/////////////////////////////////////////////////////////////////////

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

  const agent = new WebhookClient({ request, response });

  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));

  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                     Funções de controle das intents                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function getRole(role){
    let papel = [];

    switch(role){
      case 'Solo':
        papel = HEROIS_SOLO;
        break;
      case 'Lane':
        papel = HEROIS_LANE;
        break;
      case 'Mid':
        papel = HEROIS_MID;
        break;
      case 'Jungle':
        papel = HEROIS_JUNGLE;
        break;
      case 'Suporte':
        papel = HEROIS_SUPORTE;
        break;
    }

    return papel;
  }
  
  function testando(agent){

    agent.add("Deu certo");

  }

  function ultimasBuilds(agent){

    agent.add("Só um instante");
    agent.add("Pronto, atualizei as builds dos seguintes heróis:");
    agent.add(ULTIMASBUILDS_1);
    agent.add('Caso esteja sentindo falta de alguma build');
    agent.add('É só comentar no post fixo da página que em breve eu adiciono aqui!');       

  }

  function listar_menu(agent){
    agent.add("Serviços do Maloch Bot:");
    agent.add("1. Builds");
    agent.add("Você pode digitar");
    agent.add("´build + nome do herói´");
    agent.add("´build + nome do herói + nome da lane´");
    agent.add("2. Arcanas");
    agent.add("Você pode digitar");
    agent.add("´arcanas´ - Para entender melhor");
    agent.add("´arcana + nome do herói´");
    agent.add("3. Listar últimas builds adicionadas");
    agent.add("Você pode digitar");
    agent.add("´últimas builds´");
  }

  function listarAlgo(agent){
  
    const arcanas  = agent.parameters.Arcanas;
    const list     = agent.parameters.listar;  
    const cor      = agent.parameters.arcanas_cores;
    const theBest  = agent.parameters.Superioridade;
    const boots    = agent.parameters.boots;

    let filtro = { lista:list, best:theBest, arcana:arcanas, botas:boots }; 

     if(filtro.lista) {
        if(filtro.arcana){ 
          if(cor){
            switch(cor){
              case 'red':
                agent.add('As arcanas vermelhas são:');
                agent.add('Iluminação, Obliteração, Massacre, Sede de Sangue, Descontrole, Indomável, Violação, Conjuração, Atrocidade e Blitz.');
                break;
  
              case 'purple':
                agent.add('As arcanas roxas são:');
                agent.add('Colosso, Oração, Ladrão, Tirania, Imortal, Banquete, Magia Negra, Benevolência, Assassino e Guerrilha.');
                break;
  
              case 'green':
                agent.add('As arcanas verdes são:');
                agent.add('Fortificação, Aço Duro, Coragem, Proeza, Maldição, Ferrão, Agitação, Foco, Consumação e Cruzadas.');
                break;
            }
          }
          else{
            agent.add('As arcanas são separadas por cores');
            agent.add('Vermelha, Roxa ou Verde? Me diz qual cor você quer saber');
          }
        }

        if(filtro.botas){
          agent.add('As lista de itens de movimento são:');
          agent.add('Botas de Velocidade');
          agent.add(new Image(BOOTS));
          agent.add('Botas Sônicas');
          agent.add(new Image(SONIC_BOOTS));
          agent.add('Bota Dourada');
          agent.add(new Image(GILDED_BOOTS));
          agent.add('Botas Ofuscantes');
          agent.add(new Image(FLASHY_BOOTS));
          agent.add('Chutes Encatados');
          agent.add(new Image(ENCHANTED_BOOTS));
          agent.add('Botas de Guerra');
          agent.add(new Image(WAR_BOOTS));
          agent.add('Escolha de Hermes');
          agent.add(new Image(HERMES_BOOTS));
          agent.add('Para saber mais detalhes de cada uma digite ´detalhar + nome da bota´');
        }
        
      }

  }

 function calculoAtr(string, numero){
  	let text = string.split('+');
  	let aux1 = '';
  	let aux2 = '';
  	let aux3 = '';
  	let val = null;

  	aux3 = text[0];

  	if(text[1].includes('%')){
  		aux1 = text[1].replace('%', '');
		  val = parseFloat(aux1) * numero;
		  aux2 = val.toString()+ '%';
  	}else{
  		val = parseFloat(text[1]) * numero;
  		aux2 = val.toString();
  	}

  	let result = aux3 + '+' + aux2;
  	return result;
  }

  function calcularArcana(arcanaNome, numero, cor){
  	var lista = [];
    var atributoList = [];
    var result;
  	switch(cor){
  	  case 'Red':
  		lista = ARCANA_RED_LIST;
        break;
      case 'Purple':
        lista = ARCANA_PURPLE_LIST;
        break;
      case 'Green':
        lista = ARCANA_GREEN_LIST;
        break;
    }    
    var i;
    var j;
    for (i = 0; i < lista.length; i++){
      if(lista[i].nome == arcanaNome){
        var atr = lista[i].Atributos;
        console.log(atr);
        if(atr.includes(',')){
          atr = atr.replace(/\s*,\s*/g, ",");
          atr = atr.split(',');
          for (j = 0; j < atr.length; j++){
            var atrb = calculoAtr(atr[j], numero);
            console.log(atrb);

            atributoList.push(atrb);
          } 
          result = atributoList.join(', ');
        }else{
          result = calculoAtr(atr, numero);
        }

      }
    } 

    return result;
 	}

  
  function calcularArcanas(listaArcanas){
    

  }

  function detalharItens(agent){
    var boots    = agent.parameters.boots;
    var detalhar = agent.parameters.detalhes;

    let filtro = { bota:boots, detalhe:detalhar }; 

    if(filtro.detalhe && filtro.bota){
      switch(filtro.bota){
        case 'boots':
          agent.add('Botas da Velocidade é o item básico de movimento');
          agent.add(new Image(BOOTS));
          agent.add('Ela te dá +30 de velocidade de movimento');
          agent.add('E a partir dela podemos comprar outras botas, cada uma com sua particularidade');
          break;
        case 'sonic_boots':
          agent.add('Botas Sônicas:');
          agent.add(new Image(SONIC_BOOTS));
          agent.add('Te da +60 de velocidade de movimento');
          agent.add('Te dá 110 de armadura e reduz o dano físico em 15%');
          agent.add('Ideal quando o time inimigo tem pouco dano mágico');
          break;
        case 'gilded_boots':
          agent.add('Bota Dourada:');
          agent.add(new Image(GILDED_BOOTS));
          agent.add('Te da +60 de velocidade de movimento');
          agent.add('Te dá 110 de defesa mágica e aumenta sua resistencia a controle de grupo em 30%');
          agent.add('Ideal quando o time inimigo tem bastante controle de grupo e dano mágico');
          break;
        case 'flashy_boots':
          agent.add('Botas Ofuscantes:');
          agent.add(new Image(FLASHY_BOOTS));
          agent.add('Te da +60 de velocidade de movimento');
          agent.add('E reduz o tempo de recarga de habilidades em 15%');
          agent.add('Ideal para heróis que precisam atingir o máximo de redução de recarga possível(40%).');
          agent.add('Heróis como Ilumia, Ignis e outros que ativam a passiva após usar habilidades são os mais indicados a usar essa bota');
          break;
        case 'enchanted_boots':
          agent.add('Chutes Encatados:');
          agent.add(new Image(ENCHANTED_BOOTS));
          agent.add('Te da +60 de velocidade de movimento');
          agent.add('Te dá +75 de perfuração mágica');
          agent.add('Ideal para heróis que causam dano mágico');
          agent.add('E querem máximizar o dano de suas habilidades logo no inicio da partida');
          agent.add('Principalmente contra heróis que estão usando bota dourada');
          break;
        case 'war_boots':
          agent.add('Botas de Guerra:');
          agent.add(new Image(WAR_BOOTS));
          agent.add('Te da +60 de velocidade de movimento');
          agent.add('Te dá +25% de velocidade de ataque');
          agent.add('Ideal para atiradores ou heróis que causem dano físico');
          agent.add('Assim como Omen ou Murad que ativam determinada habilidade após uma quantidade ataques básicos');
          break;
        case 'hermes_boots':
          agent.add('Escolha de Hermes:');
          agent.add(new Image(HERMES_BOOTS));
          agent.add('Te da +60 de velocidade de movimento');
          agent.add('Ligeiro: Aumenta em +60 a velocidade de movimento ao sair de uma batalha');
          agent.add('Ideal para ROAMING, agilizar nas rotações e outros heróis com baixa mobilidade');
          agent.add('Ao levar dano ou atacar algum inimigo perde o efeito Ligeiro');
          break;
          
      }
    }


  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 BUILDS                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function checarBuild(agent) {

    const heroi    = agent.parameters.Heroi;
    const build    = agent.parameters.Builds;
    const role     = agent.parameters.role;

    if (!heroi) {
      agent.add('Não entendi de qual herói você quer uma build');
      agent.add('Você tem certeza que digitou o nome certo?');
      agent.add('Tenta de outro jeito!');
    } 

    let filtro = { hero:heroi, funcao:role }; 

    switch(filtro.hero) {
    
      case 'Airi':
  
        agent.add('Hm, então quer dizer que resolveu ir de Airi...');
        if (!filtro.funcao) {
          agent.add('Aqui oh:');
          agent.add(new Image(AIRI_LANE_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Aqui está sua build:');
                agent.add(new Image(AIRI_JG_URL));
                break;
              case 'Solo':
                agent.add('Aqui está sua build:');
                agent.add(new Image(AIRI_LANE_URL));
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Airi é melhor se utilizada na Solo lane ou na Jungle!');
          }
        }
        break; 

      case 'Aleister':

        agent.add('Hm, então quer dizer que resolveu jogar de Aleister...');
        if (!filtro.funcao) {
          agent.add('Aqui sua build:');
          agent.add(new Image(ALEISTER_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add(BUILD_EM_BREVE);
                break;
              case 'Mid':
                agent.add('Tenho para você duas builds...');
                agent.add('Essa aqui caso você esteja aprendendo a jogar com o herói:');
                agent.add(new Image(ALEISTER_URL));
                agent.add('E caso você queira testar uma build nova');
                agent.add('Tenta essa:');
                agent.add(new Image(ALEISTER_2_URL));
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Aleister é melhor se utilizado no Mid, e talvez possa ser usado também como Suporte!');
          }
        }
        break;

      case 'Alice':

        agent.add('Hm, então quer dizer que resolveu jogar de Alice...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ALICE_2_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
          agent.add('Anel do Amigo, é o mais recomendado se tiver inimigo que fica invisível.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Tenho essa aqui:');
                agent.add(new Image(ALICE_2_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Anel do Amigo, é o mais recomendado se tiver inimigo que fica invisível.');
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Alice é melhor se utilizada como Suporte!');
          }
        }
        break;

      case 'Amily':

        agent.add('Hm, então quer dizer que resolveu jogar de Amily...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(AMILY_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui está sua build');
                agent.add(new Image(AMILY_URL));
                break;
              case 'Jungle':
                agent.add('Aqui está sua build');
                agent.add(new Image(AMILY_JG_URL));
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Amily é melhor se utilizada na Solo lane ou na Jungle!');
          }
        }
        break;

      case 'Annette':

        agent.add('Hm, então quer dizer que resolveu jogar de Annette...');
        if (!filtro.funcao) {
          agent.add('Aqui, tenho essas builds para você');
          agent.add(new Image(ANNETE_URL));
          agent.add(new Image(ANNETE_2_URL));
          agent.add(new Image(ANNETE_3_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
          agent.add('Anel do Amigo, é o mais recomendado se tiver inimigo que fica invisível.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Aqui, tenho essas builds para você');
                agent.add(new Image(ANNETE_URL));
                agent.add(new Image(ANNETE_2_URL));
                agent.add(new Image(ANNETE_3_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Anel do Amigo, é o mais recomendado se tiver inimigo que fica invisível.');
                break;
              case 'Mid':
                agent.add(BUILD_EM_BREVE);
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Annette é melhor se utilizada como suporte!');
          }
        }
        break;

      case 'Arduin':

        agent.add('Hm, então quer dizer que resolveu jogar de Arduin...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ARDUIN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui está sua build');
                agent.add(new Image(ARDUIN_URL));
                break;
              case 'Suporte':
                agent.add(BUILD_EM_BREVE);
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Arduin é melhor se utilizado na Solo lane ou dependendo como Suporte!');
          }
        }
        break;

      case 'Arthur':

        agent.add('Hm, então quer dizer que resolveu jogar de Arthur...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ARTHUR_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui está sua build');
                agent.add(new Image(ARTHUR_URL));
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Arthur é melhor se utilizado na Solo lane!');
          }
        }
        break;

      case 'Arum':

        agent.add('Hm, então quer dizer que resolveu jogar de Arum...'); 
        if (!filtro.funcao) {
          agent.add('Deixa eu ver o que tenho para você...');
          agent.add('Caso queira jogar na SOLO lane:');
          agent.add(new Image(ARUM_SOLO_URL));
          agent.add('E tenho essa outra aqui se for jogar de SUPORTE:');
          agent.add(new Image(ARUM_SUPORTE_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Só um instante...');
                agent.add('Aqui, tenho essa build para jogar na Solo lane:');
                agent.add(new Image(ARUM_SOLO_URL));
                break;
              case 'Suporte':
                agent.add('Só um instante...');
                agent.add('Aqui, tenho essa build para jogar como Suporte/Roaming:');
                agent.add(new Image(ARUM_SUPORTE_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Essência do Vento ou Anel do Amigo, vai depender do time inimigo.');
                break;
              }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Arum é melhor se utilizada na Solo lane ou como Suporte!');
          }
        }
        break;

      case 'Astrid':

        agent.add('Hm, então quer dizer que resolveu jogar de Astrid...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ASTRID_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui está sua build:');
                agent.add(new Image(ASTRID_URL));
                break;
              case 'Jungle':
                agent.add('Aqui está sua build:');
                agent.add(new Image(ASTRID_JG_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Astrid é melhor se utilizada na Solo lane ou talvez na Jungle!');
          }
        }
        break;

      case 'Azzenka':

        agent.add('Hm, então quer dizer que resolveu jogar de Azzen´ka...');
        if (!filtro.funcao) {
          agent.add('Aqui sua build:');
          agent.add(new Image(AZZENKA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Aqui está sua build:');
                agent.add(new Image(AZZENKA_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Azzen´ka é melhor se utilizado no Mid!');
          }
        }
        break;

      case 'Baldum':

        agent.add('Hm, então quer dizer que resolveu jogar de Baldum...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(BALDUM_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
          agent.add('Essência do Vento ou Anel do Amigo, vai depender do time inimigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Tenho essas duas:');
                agent.add(new Image(BALDUM_URL));
                agent.add(new Image(BALDUM_2_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Essência do Vento ou Anel do Amigo, vai depender do time inimigo.');
                break;
              case 'Solo':
                agent.add('Tenho essa aqui:');
                agent.add(new Image(BALDUM_SOLO_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Annette é melhor se utilizada como suporte!');
          }
        }
        break;

      case 'Batman':

        agent.add('Hm, então quer dizer que resolveu jogar de Batman...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(BATMAN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('No momento só tenho essa build');
                agent.add(new Image(BATMAN_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Batman é melhor se utilizado como Jungle!');
          }
        }
        break;

      case 'Butterfly':

        agent.add('Hm, então quer dizer que resolveu jogar de Butterfly...'); 
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Caso seja iniciante, o ideal é começar por essa build aqui:');
          agent.add(new Image(BUTTERFLY_TANK_URL));
          agent.add('Mas se você já domina a SELVA, pode seguir com essa outra.');
          agent.add(new Image(BUTTERFLY_AD_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('No momento eu tenho essas build:');
                agent.add('Caso queira jogar com ela mais Tank tenho essa:');
                agent.add(new Image(BUTTERFLY_TANK_URL));
                agent.add('Mas se você já tem Tanks suficientes no seu time, usa essa:');
                agent.add(new Image(BUTTERFLY_AD_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Butterfly é melhor se utilizada como Jungle!');
          }
        }
        break;       

      case 'Capheny':

        agent.add('Hm, então quer dizer que resolveu jogar de Capheny... Infelizmente não tenho builds para ela!');
        agent.add('Talvez eu tenha quando ela for lançada...');
        break;

      case 'Chaugnar':

        agent.add('Hm, então quer dizer que resolveu jogar de Chaugnar...');
        agent.add('Deixa eu ver o que tenho para você...'); 
        if (!filtro.funcao) {
          agent.add('Se seu time já tiver outro tank, faz essa:');
          agent.add(new Image(CHAUGNAR_AP_URL));
          agent.add('Caso não, te aconselho fazer essa:');
          agent.add(new Image(CHAUGNAR_TANK_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
          } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Se seu time já tiver outro tank, faz essa:');
                agent.add(new Image(CHAUGNAR_AP_URL));
                agent.add('Caso não, te aconselho fazer essa:');
                agent.add(new Image(CHAUGNAR_TANK_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Chaugnar é melhor se utilizado como suporte!');
          }
        }
        break;

      case 'Cresht':

        agent.add('Hm, então quer dizer que resolveu jogar de Cresht...'); 
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Caso esteja jogando como SUPORTE, vai com essa:');
          agent.add(new Image(CRESHT_SUPORTE_URL));
          agent.add('Mas se só sobrou a SOLO lane, essa é a melhor:');
          agent.add(new Image(CRESHT_SOLO_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
          } else {
            if (getRole(filtro.funcao).includes(filtro.hero)) {
              switch(filtro.funcao){
                case 'Suporte':
                  agent.add('Aqui sua build de Suporte');
                  agent.add(new Image(CRESHT_SUPORTE_URL));
                  agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                  break;
                case 'Solo':
                  agent.add('Pronto, achei uma build Solo:');
                  agent.add(new Image(CRESHT_SOLO_URL));
                  break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Cresht é melhor se utilizado como suporte!');
          }
        }
        break;

      case 'Darcy':

        agent.add('Hm, então quer dizer que resolveu jogar de D´Arcy... ');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Pronto, essa aqui é a build mais comum Mid:');
          agent.add(new Image(DARCY_MID_URL));
          agent.add('Mas também tenho essa Jungle:');
          agent.add(new Image(DARCY_JG_URL));    
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Aqui sua build:');
                agent.add(new Image(DARCY_JG_URL));
                agent.add('E pelo pouco que treinei com ele minhas dicas são:');
                agent.add('Usa a primeira skill para dar slow no inimigo');
                agent.add('E antecipa o movimento do inimigo para usar a segunda.');
                break;
              case 'Mid':
                agent.add('Pronto, achei essa build:');
                agent.add(new Image(DARCY_MID_URL));
                agent.add('Mas também tenho essa');
                agent.add(new Image(DARCY_MID_2_URL));
                agent.add('E pelo pouco que treinei com ele minhas dicas são:');
                agent.add('Usa a primeira skill para dar slow no inimigo');
                agent.add('E antecipa o movimento do inimigo para usar a segunda.');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O D´Arcy é melhor se utilizado no Mid ou na Jungle!');
          }
        }
        break;  

      case 'Diaochan':

        agent.add('Diaochan? Claro só um instante'); 
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Pronto, essa aqui é a build mais comum Mid:');
          agent.add(new Image(DIAOCHAN_MID_URL));
          agent.add('Mas se tiver precisando de um Suporte:');
          agent.add(new Image(DIAOCHAN_SUP_URL));     
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Aqui sua build de Suporte');
                agent.add(new Image(DIAOCHAN_SUP_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Essência do Vento ou Anel do Amigo, vai depender do time inimigo.');
                break;
              case 'Mid':
                agent.add('Pronto, achei essa build Mid:');
                agent.add(new Image(DIAOCHAN_MID_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Diaochan é melhor se utilizada como Mid e talvez como suporte!');
          }
        }
        break; 

      case 'Elsu':

        agent.add('Hm, então quer dizer que resolveu jogar de Elsu...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Por enquanto só tenho essa:');
          agent.add(new Image(ELSU_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(ELSU_URL));
                break;
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(ELSU_URL));
                break;
              case 'Jungle':
                agent.add(BUILD_EM_BREVE);
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Elsu é melhor se utilizado na Lane, Jungle ou talvez no Mid!');
          }
        }
        break;  

      case 'Errol':

        agent.add('Errol... deixa eu ver...');
        agent.add('Infelizmente ainda não está em nosso servidor');
        agent.add('Assim que tiver noticias dele, te informo melhor, ta bom?'); 
        break;

      case 'Fennik':

        agent.add('Hm, então quer dizer que resolveu jogar de Fennik...');
        agent.add('Deixa eu ver o que tenho');
        if (!filtro.funcao) {
          agent.add('Por enquanto só tenho essa:'); 
          agent.add(new Image(FENNIK_URL));
          agent.add('Espero que saiba jogar na Selva');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add(BUILD_EM_BREVE);
                break;
              case 'Jungle':
                agent.add('Aqui, tenho duas:');
                agent.add(FENNIK_URL);
                agent.add(FENNIK_2_URL);
                agent.add('Se você tiver iniciando com ele, te recomendo a primeira!');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Fennik é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Florentino':

        agent.add('Eita, quer apelar mesmo de Florentino ein?');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui oh, build mais comum e eficiente dele:');
          agent.add(new Image(FLORENTINO_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Pronto, achei uma build:');
                agent.add(new Image(FLORENTINO_JG_URL));
                break;
              case 'Solo':
                agent.add('Pronto, achei uma build Solo:');
                agent.add(new Image(FLORENTINO_URL));
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Florentino é melhor se utilizado como Solo, e talvez na Jungle!');
          }
        }
        break;


      case 'Gildur':

        agent.add('Hm, então quer dizer que resolveu jogar de Gildur...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Caso queira jogar no MID ou SOLO lane:');
          agent.add(new Image(GILDUR_AP_URL));
          agent.add('Mas se você precisa de um SUPORTE:');
          agent.add(new Image(GILDUR_SUPORTE_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(GILDUR_AP_URL));
                break;
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(GILDUR_AP_URL));
                break;
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(GILDUR_SUPORTE_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Gildur é melhor se utilizado como Suporte ou talvez no Mid ou na Solo Lane!');
          }
        }
        break; 

      case 'Grakk':

        agent.add('Hm, então quer dizer que resolveu jogar de Grakk...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(GRAKK_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(GRAKK_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Grakk é melhor se utilizado como Suporte!');
          }
        }
        break;

      case 'Hayate':

        agent.add('Hm, então quer dizer que resolveu jogar de Hayate... ');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Tenho duas');    
          agent.add('Caso queira jogar na jungle:');
          agent.add(new Image(HAYATE_JG_2_URL));  
          agent.add('Caso queira jogar na lane:');
          agent.add(new Image(HAYATE_LANE_URL));    
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(HAYATE_LANE_URL));
                break;
              case 'Jungle':
                agent.add('Tenho essas:');
                agent.add(new Image(HAYATE_JG_1_URL));
                agent.add(new Image(HAYATE_JG_2_URL));
                agent.add('Fica ao seu critério qual usar.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Hayate é melhor se utilizado na Lane ou na Jungle!');
          }
        }
        break;

      case 'Ignis':

        agent.add('Hm, então quer dizer que resolveu jogar de Ignis...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(IGNIS_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(IGNIS_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Ignis é melhor se utilizado como Mid!');
          }
        }
        break;

      case 'Ilumia':

        agent.add('Hm, então quer dizer que resolveu jogar de Ilumia...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ILUMIA_URL));
          agent.add('Mas te garanto uma coisa, essa mêcanica assusta...');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Aqui, tenho essas duas:');
                agent.add(new Image(ILUMIA_URL));
                agent.add(new Image(ILUMIA_2_URL));
                agent.add('Mas já vou avisa que essa mêcanica assusta...');
                agent.add('E lembra de sempre olhar para o mapa pois sua ult pode ajudar seus amigos mais distantes!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Ilumia é melhor se utilizada no Mid!');
          }
        }
        break; 

      case 'Jinnar':

        agent.add('Hm, então quer dizer que resolveu jogar de Jinnar...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(JINNAR_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(JINNAR_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Jinnar é melhor se utilizado no Mid!');
          }
        }
        break; 

      case 'Kahlii':

        agent.add('Hm, então quer dizer que resolveu jogar de Kahlii...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(KAHLII_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(KAHLII_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Kahlii é melhor se utilizada no Mid!');
          }
        }
        break;  

      case 'KilGroth':

        agent.add('Hm, então quer dizer que resolveu jogar de Kil´Groth...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(KILGROTH_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(KILGROTH_URL));
                break;
              case 'Jungle':
                agent.add('Talvez essa sirva:');
                agent.add(new Image(KILGROTH_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Kil´Groth é melhor se utilizado na Solo e dependendo do time talvez na Jungle!');
          }
        }
        break;

      case 'Kriknak':

        agent.add('Hm, então quer dizer que resolveu jogar de Kriknak...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(KRIKNAK_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(KRIKNAK_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Kriknak é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Krixi':

        agent.add('Hm, então quer dizer que resolveu jogar de Krixi...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(KRIXI_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(KRIXI_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Krixi é melhor se utilizada no Mid!');
          }
        }
        break;

      case 'Lauriel':

        agent.add('Hm, então quer dizer que resolveu jogar de Lauriel...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(LAURIEL_URL));
          agent.add(new Image(LAURIEL_TANK_URL));
          agent.add('Fica ao seu critério escolher qual a melhor.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Tenho essas duas:');
                agent.add(new Image(LAURIEL_URL));
                agent.add(new Image(LAURIEL_TANK_URL));
                agent.add('As duas são muito boas, porém se você não tiver as arcanas apropriadas sugiro ir com a segunda!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Lauriel é melhor se utilizada no Mid!');
          }
        }
        break;

      case 'Liliana':

        agent.add('Hm, então quer dizer que resolveu jogar de Liliana...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(LILIANA_URL)); 
          agent.add('Não esquece de completar a máscara demoníaca viu?');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(LILIANA_URL));
                agent.add('Não esquece de completar a máscara demoníaca viu?');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Liliana é melhor se utilizada no Mid!');
          }
        }
        break;

      case 'Lindis':

        agent.add('Hm, então quer dizer que resolveu jogar de Lindis...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(LINDIS_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(LINDIS_URL));
                break;
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(LINDIS_LANE_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Lindis é melhor se utilizada na Jungle!');
          }
        }
        break;

      case 'LuBu':

        agent.add('Hm, então quer dizer que resolveu jogar de Lu Bu...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(LUBU_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(LUBU_URL));
                break;
              case 'Jungle':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Lu Bu é melhor se utilizado na Solo lane!');
          }
        }
        break;

      case 'Lumburr':

        agent.add('Hm, então quer dizer que resolveu jogar de Lumburr...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(LUMBURR_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(LUMBURR_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Lumburr é melhor se utilizado como Suporte!');
          }
        }
        break;

      case 'Maloch':

        agent.add('Hm, quer dizer então que você quer saber o segredo da minha força?!');
        agent.add('Tua sorte, é que eu conto sim! Só um instante...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MALOCH_URL));
          agent.add('Mas com essa build eu nunca falho!');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui, tenho essas:');
                agent.add(new Image(MALOCH_URL));
                agent.add(new Image(MALOCH_2_URL));
                agent.add('Se você for iniciante, te recomendo a primeira!');
                agent.add('A segunda possui um item ativo que em breve vou explicar melhor sobre eles!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+'?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('Eu sou melhor se utilizado na Solo lane!');
          }
        }
        break;

      case 'Marja':

        agent.add('Hm, então quer dizer que resolveu jogar de Marja...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MARJA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(MARJA_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Marja é melhor se utilizada na Solo lane!');
          }
        }
        break;

      case 'Max':

        agent.add('Hm, então quer dizer que resolveu jogar de Max...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MAX_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas duas:');
                agent.add(new Image(MAX_URL));
                agent.add(new Image(MAX_2_URL));
                agent.add("Você escolhe a que mais gostar!");
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Max é melhor se utilizado na Solo lane!');
          }
        }
        break;

      case 'Mganga':

        agent.add('Hm, então quer dizer que resolveu jogar de Mganga...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MGANGA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(MGANGA_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Mganga é melhor se utilizado no Mid!');
          }
        }
        break;

      case 'Mina':

        agent.add('Hm, então quer dizer que resolveu jogar de Mina...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MINA_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Tenho essas:');
                agent.add(new Image(MINA_URL));
                agent.add(new Image(MINA_2_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Mina é melhor se utilizada como Suporte!');
          }
        }
        break;


      case 'Moren':

        agent.add('Hm, então quer dizer que resolveu jogar de Moren...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MOREN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(MOREN_URL));
                break;
              case 'Jungle':
                agent.add('Tenho essa:');
                agent.add(new Image(MOREN_JG_URL));
                agent.add('Mas se você tiver aprendendo a jogar com ele te aconselho essa:');
                agent.add(new Image(MOREN_JG_2_URL));
                agent.add('Lembrando que ao pegar 20 stacks o ideal é evoluir o item para conseguir as 30 stacks');
                agent.add('E depois trocar para o Vento Escaldante');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Moren é melhor se utilizado na Lane e na Jungle!');
          }
        }
        break;

      case 'Murad':

        agent.add('Hm, então quer dizer que resolveu jogar de Murad...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(MURAD_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(MURAD_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Murad é melhor se utilizado na Jungle!');
          }
        }
        break; 

      case 'Nakroth':

        agent.add('Hm, então quer dizer que resolveu jogar de Nakroth...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(NAKROTH_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(NAKROTH_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Nakroth é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Natalya':

        agent.add('Hm, então quer dizer que resolveu jogar de Natalya...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(NATALYA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(NATALYA_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Natalya é melhor se utilizada no Mid!');
          }
        }
        break;

      case 'Omega':

        agent.add('Hm, então quer dizer que resolveu jogar de Omega...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(OMEGA_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(OMEGA_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              case 'Solo':
                agent.add(BUILD_EM_BREVE);
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Omega é melhor se utilizado como Suporte!');
          }
        }
        break;

      case 'Ormarr':

        agent.add('Hm, então quer dizer que resolveu jogar de Ormarr...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ORMARR_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(ORMARR_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Ormarr é melhor se utilizado como Suporte!');
          }
        }
        break;

      case 'Omen':

        agent.add('Hm, então quer dizer que resolveu jogar de Omen...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(OMEN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas duas:');
                agent.add(new Image(OMEN_URL));
                agent.add(new Image(OMEN_2_URL));
                agent.add('Fica ao seu critério a melhor!');
                break;
              case 'Jungle':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Omen é melhor se utilizado na Solo!');
          }
        }
        break;

      case 'Peura':

        agent.add('Hm, então quer dizer que resolveu jogar de Peura...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(PEURA_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(PEURA_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Peura é melhor se utilizada como Suporte!');
          }
        }
        break;

      case 'Preyta':

        agent.add('Hm, então quer dizer que resolveu jogar de Preyta...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(PREYTA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(PREYTA_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Preyta é melhor se utilizado no Mid!');
          }
        }
        break;

      case 'Quillen':

        agent.add('Hm, então quer dizer que resolveu jogar de Quillen...');
        agent.add('É, pelo visto alguém gosta de jogar com heróis quebrados...');
        agent.add('Mas chega de papo');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(QUILLEN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(QUILLEN_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Quillen é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Raz':

        agent.add('Hm, então quer dizer que resolveu jogar de Raz...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(RAZ_URL));
          agent.add('Após fechar a build, o ideal é vender a Lágrima da Fênix e comprar outro item de sua preferência!');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(RAZ_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(RAZ_JG_URL));
                agent.add('O ideal é que ao usar o Raz na Jungle você saiba combar com ele');
                agent.add('Pois diferente da build Mid, que foca na segunda skill como poke');
                agent.add('Essa build precisa usar Auto Attack após usar uma habilidade');
                agent.add('Caso ainda não saiba o ideal é praticar, em breve te explico melhor como fazer');
               break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Raz é melhor se utilizado no Mid!');
          }
        }
        break;

      case 'Riktor':

        agent.add('Hm, então quer dizer que resolveu jogar de Riktor...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(RIKTOR_SOLO_URL));
          agent.add('Se souber jogar direitinho, usando o matinho ao seu favor, ele se torna um bom counter do rapaz das flores...');
          agent.add('Ah, e também tenho essa outra como SUPORTE:');
          agent.add(new Image(RIKTOR_ROAM_URL));
          agent.add('O controle de mapa que você tem, uma vez que domina a passiva dele, é muito forte!');
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
          agent.add('Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(RIKTOR_SOLO_URL));
                agent.add('Se souber jogar direitinho, usando o matinho ao seu favor, ele se torna um bom counter do rapaz das flores...');
                break;
              case 'Suporte':
                agent.add('Tenho essas duas aqui:');
                agent.add(new Image(RIKTOR_ROAM_URL));
                agent.add(new Image(RIKTOR_ROAM_2_URL));
                agent.add('O controle de mapa que você tem, uma vez que domina a passiva dele, é muito forte!');
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2); 
            agent.add('O Riktor é melhor se utilizado na Solo e como Suporte Roaming!');
          }
        }
        break;

      case 'Rourke':

        agent.add('Hm, então quer dizer que resolveu jogar de Rourke...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ROURKE_URL));
          agent.add('Mas minha dica é começar com Sr. Facada como item de CAÇA');
          agent.add('e após stackar uma quantidade boa de monstros da SELVA, trocar pelo Vento Escaldante.');
          agent.add('Assim vai ser mais fácil de farmar no começo do jogo 😉');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Tenho essas duas aqui');
              agent.add(new Image(ROURKE_URL));
              agent.add(new Image(ROURKE_2_URL));
              agent.add('Mas se quiser começar com Sr. Facada como item de CAÇA');
              agent.add('nas duas opções dá certo, e no fim é só trocar pelo Vento Escaldante.');
              agent.add('Assim vai ser mais fácil de farmar no começo do jogo 😉');
                break;
              case 'Solo':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2); 
            agent.add('O Rourke é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Roxie':

        agent.add('Hm, então quer dizer que resolveu jogar de Roxie...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add('Se você gosta de dar invade e quer usar PUNIR como talento, vai com essa:');
          agent.add(new Image(ROXIE_PUNIR_URL));
          agent.add('Mas também tenho essa:');
          agent.add(new Image(ROXIE_FLICK_URL));
          agent.add('Uma dica é que você pode usar como talento tanto Executar como Flick com essa build.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Se você gosta de dar invade e quer usar PUNIR como talento, vai com essa:');
                agent.add(new Image(ROXIE_PUNIR_URL));
              agent.add('Mas também tenho essa:');
              agent.add(new Image(ROXIE_FLICK_URL));
              agent.add('Uma dica é que você pode usar como talento tanto Executar como Flick com essa build.');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2); 
            agent.add('A Roxie é melhor se utilizada na Solo lane!');
          }
        }
        break;

      case 'Ryoma':

        agent.add('Hm, então quer dizer que resolveu jogar de Ryoma...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add('Caso queira jogar na SELVA, usa essa:');
          agent.add(new Image(RYOMA_JG_URL));
          agent.add('Mas SOLO lane é essa:');
          agent.add(new Image(RYOMA_SOLO_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(RYOMA_SOLO_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(RYOMA_JG_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2); 
            agent.add('O Ryoma é melhor se utilizado na Solo ou na Jungle!');
          }
        }
        break;

      case 'Sephera':

        agent.add('Hm, então quer dizer que resolveu jogar de Sephera...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(SEPHERA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(SEPHERA_URL));
                break;
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(SEPHERA_ROAM_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Sephera é melhor se utilizada no Mid!');
          }
        }
        break;

      case 'Skud':

        agent.add('Hm, então quer dizer que resolveu jogar de Skud...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(SKUD_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(SKUD_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Skud é melhor se utilizado na Solo!');
          }
        }
        break;  

      case 'Slimz':

        agent.add('Hm, então quer dizer que resolveu jogar de Slimz...'); 
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add('Caso queira jogar na SELVA, usa essa:');
          agent.add(new Image(SLIMZ_JG_URL));
          agent.add('Se for na lane:');
          agent.add(new Image(SLIMZ_LANE_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(SLIMZ_LANE_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(SLIMZ_JG_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Slimz é melhor se utilizado na Lane ou na Jungle!');
          }
        }
        break;

      case 'Superman':

        agent.add('Hm, então quer dizer que resolveu jogar de Superman...'); 
        agent.add('Deixa eu ver o que temos de mais novo no meta...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add('Se você quer irritar seus inimigos como SUPORTE, dando visão para seu time e ajudando nas TFs, te recomendo essa build aqui:');
          agent.add(new Image(SUPERMAN_ROAM_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
          agent.add('Agora se for jogar na SOLO, usa essa:');
          agent.add(new Image(SUPERMAN_SOLO_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas duas aqui oh:');
                agent.add(new Image(SUPERMAN_SOLO_URL));
                agent.add(new Image(SUPERMAN_SOLO_2_URL));
                agent.add('Fica ao seu critério, qual escolher');
                break;
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(SUPERMAN_ROAM_URL)); 
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Superman é melhor se utilizado na Solo ou como Suporte Roaming!');
          }
        }
        break;

      case 'Taara':

        agent.add('Hm, então quer dizer que resolveu jogar de Taara...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(TAARA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(TAARA_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Taara é melhor se utilizada na Solo!');
          }
        }
        break;

      case 'TeeMee':

        agent.add('Hm, então quer dizer que resolveu jogar de TeeMee...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(TEEMEE_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Tenho essa:');
                agent.add(new Image(TEEMEE_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
                agent.add('Essência do Vento ou Anel do Amigo, vai depender do time inimigo.');
                agent.add('E também tenho essa aqui:');
                agent.add(new Image(TEEMEE_2_URL));
                agent.add('O ideal é jogar junto de amigos com essa build');
                agent.add('Pois você precisa participar de todas as team fights que acontecer!');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O TeeMee é melhor se utilizado como Suporte!');
          }
        }
        break;

      case 'TelAnnas':

        agent.add('Hm, então quer dizer que resolveu jogar de Tel´Annas...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(TELANNAS_URL));        
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Tenho essa:');
                agent.add(new Image(TELANNAS_URL));
                agent.add('E tenho essa outra recém utilizada em um campeonato:');
                agent.add(new Image(TELANNAS_2_URL));
                agent.add('Vale a pena dar uma testada!');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Tel´Annas é melhor se utilizada na Lane!');
          }
        }
        break;


      case 'Thane':

        agent.add('Hm, então quer dizer que resolveu jogar de Thane...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(THANE_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(THANE_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Thane é melhor se utilizado como Suporte!');
          }
        }
        break;

      case 'TheFlash':

        agent.add('Hm, então quer dizer que resolveu jogar de Flash...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(THEFLASH_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Tenho essas:');
                agent.add(new Image(THEFLASH_URL));
                agent.add(new Image(THEFLASH_2_URL));
                agent.add(new Image(THEFLASH_3_URL));
                agent.add('Se você já domina o herói, não custa nada testar a terceira opção!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Flash é melhor se utilizado no Mid!');
          }
        }
        break;


      case 'TheJoker':

        agent.add('Hm, então quer dizer que resolveu jogar de Coringa...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(THEJOKER_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(THEJOKER_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Coringa é melhor se utilizado na Lane!');
          }
        }
        break;

      case 'Toro':

        agent.add('Hm, então quer dizer que resolveu jogar de Toro... Infelizmente não tenho builds para ele.');
        break;

      case 'Tulen':

        agent.add('Hm, então quer dizer que resolveu jogar de Tulen...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(TULEN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(TULEN_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(TULEN_JUNGLE_URL));
                agent.add('A ideia é ter um counter de Assassinos');
                agent.add('Aproveitando o fato de que o Tulen foi feito para usar suas skills o mais próximo do inimigo, para maximizar o dano.');
                agent.add('E sempre se esconda na moita para surpreender seus inimigos!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Tulen é melhor se utilizado no Mid ou dependendo do time na Jungle!');
          }
        }
        break;

      case 'Valhein':

        agent.add('Hm, então quer dizer que resolveu jogar de Valhein...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(VALHEIN_URL));
          agent.add('Vê se não trolla, ta?');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VALHEIN_URL));
                break;
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VALHEIN_2_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Valhein é melhor se utilizado na Lane ou dependendo do time na Solo!');
          }
        }
        break;

      case 'Veera':

        agent.add('Você quis dizer, Valhein AP?');
        agent.add('Brincadeira... rsrsrs');
        if (!filtro.funcao) {
          agent.add('Aqui, uma build de Veera');
          agent.add(new Image(VEERA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VEERA_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Veera é melhor se utilizada no Mid!');
          }
        }
        break;

      case 'Veres':

        agent.add('Hm, então quer dizer que resolveu jogar de Veres...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(VERES_URL));
          agent.add(new Image(VERES_TANK_URL));
          agent.add('Fica ao seu critério escolher qual, mas se ta faltando tank no seu time, fica com a segunda!');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Achei essas duas aqui:');
                agent.add(new Image(VERES_URL));
                agent.add(new Image(VERES_TANK_URL));
                agent.add('Fica ao seu critério escolher qual, mas se ta faltando tank no seu time, fica com a segunda!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Veres é melhor se utilizada na Solo!');
          }
        }
        break;

      case 'Violet':

        agent.add('Hm, então quer dizer que resolveu jogar de Violet...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui, uma build para jogar na lane:');
          agent.add(new Image(VIOLET_LANE_URL));
        agent.add('E uma para jogar na SELVA:');
        agent.add(new Image(VIOLET_JG_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VIOLET_LANE_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VIOLET_JG_URL));
                agent.add('Não esquece de completar o item de caça para liberar mais stacks de monstros da Jungle.');
                agent.add('Sr Facada acumula até 20, Ladrão de Almas até 30!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Violet é melhor se utilizada na Lane ou na Jungle!');
          }
        }
        break;

      case 'Wiro':

        agent.add('Hm, então quer dizer que resolveu jogar de Wiro...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(WIRO_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(WIRO_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Wiro é melhor se utilizado na Solo!');
          }
        }
        break;

      case 'Wisp':

        agent.add('Hm, então quer dizer que resolveu jogar de Wisp...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(WISP_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(WISP_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(WISP_JG_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Wisp é melhor se utilizada na Solo!');
          }
        }
        break;

      case 'Wonder Woman':

        agent.add('Hm, então quer dizer que resolveu jogar de Mulher Maravilha...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(WONDERWOMAN_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(WONDERWOMAN_URL));
                break;
              case 'Jungle':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Mulher Maravilha é melhor se utilizada na Solo!');
          }
        }
        break;

      case 'Wukong':

        agent.add('Hm, então quer dizer que resolveu jogar de Wukong...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('♪ sopa de macaco ♪ sopa sopa de macaco ♪');
          agent.add('...');
          agent.add('Ops... é que eu lembrei de uma música');
          agent.add('Mas aqui está:');
          agent.add(new Image(WUKONG_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add(BUILD_EM_BREVE);
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(WUKONG_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Wukong é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Xeniel':

        agent.add('Hm, então quer dizer que resolveu jogar de Xeniel...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(XENIEL_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(XENIEL_URL));
                break;
              case 'Suporte':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Xeniel é melhor se utilizado na Solo ou como Suporte!');
          }
        }
        break;

      case 'YBneth':

        agent.add('Hm, então quer dizer que resolveu jogar de Y´bneth...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Por enquanto só tenho essa:');
          agent.add(new Image(YBNETH_URL));        
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(YBNETH_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(YBNETH_SOLO_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Y´bneth é melhor se utilizado na Solo lane ou como Suporte!');
          }
        }
        break;

      case 'Yorn':

        agent.add('Hm, então quer dizer que resolveu jogar de Yorn...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(YORN_URL)); 
          agent.add('Por favor, não seja troll!');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(YORN_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Yorn é melhor se utilizado na Lane!');
          }
        }
        break;

      case 'Zanis':

        agent.add('Hm, então quer dizer que resolveu jogar de Zanis...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ZANIS_OFF_TANKURL));
          agent.add('Mas uma dica é, infelizmente você não me sola! ;)');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Tenho essas duas aqui:');
                agent.add(new Image(ZANIS_URL));
                agent.add(new Image(ZANIS_OFF_TANKURL));
                agent.add('Se seu time precisar de tank, fica com a segunda');
                agent.add('mas se tiver suficientes, a primeira é também uma ótima opção!');
                break;
              case 'Solo':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Zanis é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Zephys':

        agent.add('Hm, então quer dizer que resolveu jogar de Zephys...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add('Bom, temos duas variações de build, fica ao seu critério qual a melhor');
          agent.add(new Image(ZEPHYS_TANK_URL));
        agent.add(new Image(ZEPHYS_AD_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Tenho duas builds:');
              agent.add(new Image(ZEPHYS_TANK_URL));
              agent.add(new Image(ZEPHYS_AD_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Zephys é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Zill':

        agent.add('Hm, então quer dizer que resolveu jogar de Zill...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ZILL_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Tenho essa build aqui:');
              agent.add(new Image(ZILL_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Zill é melhor se utilizado na Jungle!');
          }
        }
        break;

      case 'Zuka':

        agent.add('Hm, então quer dizer que resolveu jogar de Zuka...');
        agent.add('Deixa eu ver o que tenho para você...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ZUKA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
              agent.add(new Image(ZUKA_URL));
                break;
              case 'Jungle':
                agent.add(BUILD_EM_BREVE);
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Zuka é melhor se utilizado na Solo!');
          }
        }
        break;
    } 
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 BOOTS                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function checarBoots(agent) {
    const heroi    = agent.parameters.Heroi;
    const build    = agent.parameters.Builds;
    const boots    = agent.parameters.boots;
    const theBest  = agent.parameters.Superioridade;
    const duvida   = agent.parameters.duvidas;

    let filtro = { hero:heroi, builds:build, bota:boots, melhor:theBest, pergunta:duvida}; 
    if (filtro.bota && filtro.bota == 'boots'){
      if(filtro.pergunta){
        switch(filtro.pergunta) {
          case 'porque':
            agent.add('Boa pergunta');
            agent.add('Nas minhas builds eu indico somente a bota básica de movimento');
            agent.add('Pois cada bota assim como cada item é situacional');
            agent.add('Para entender melhor basta digitar ´listar botas´');
            break;
          case 'qual':
            agent.add('Não existe uma bota certa para o herói');
            agent.add('Pois assim como os itens, cada um tem sua situação adequada');
            agent.add('Para entender melhor cada bota, basta digitar ´listar botas´ ');
            break;
        }
      }
      if(filtro.melhor){
        agent.add('Olha, o melhor é fazer pelo menos a básica');
        agent.add('Mas caso queira entender cada uma e saber escolher a mais adequada para o seu herói');
        agent.add('Digite ´listar botas´ que eu te explico com maior prazer!');
      }
      if(!filtro.melhor && !filtro.pergunta){
        agent.add('Nas minhas builds vou indicar agora apenas a bota básica de movimento');
        agent.add('Dessa forma você fica livre para completar com a que mais gostar ');
        agent.add('Ou com a que for mais adequada para sua partida');
        agent.add('Para entender melhor cada bota, digite ´listar botas´');
      }
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 ARCANAS                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  function checarArcanas(agent) {

    const arcanas  = agent.parameters.Arcanas;
    const heroi    = agent.parameters.heroi;
    const sobre    = agent.parameters.Sobre;
    const classes  = agent.parameters.classes;
    const begginer = agent.parameters.levelPlayer;
    const theBest  = agent.parameters.Superioridade;
    const tipoDano = agent.parameters.tiposDeBuild;

    let filtro = { hero:heroi, classe:classes, iniciante:begginer, tipo:tipoDano, explicar:sobre }; 

    if(arcanas && !filtro.explicar && !filtro.hero && !filtro.classe && !filtro.iniciante && !filtro.tipo){
      agent.add('Para informações sobre arcanas digite:');
      agent.add('´arcana informações´');
      agent.add('Para arcanas mais indicadas para iniciantes digite:');
      agent.add('´arcana para iniciantes´');
      agent.add('Para saber a arcanas recomendadas para um herói digite:');
      agent.add('´arcana + nome do herói´');
    }

    if(arcanas && filtro.explicar){
      agent.add('As arcanas são atributos extras');
      agent.add('Que você equipa ao seu herói');
      agent.add('Antes da partida começar');
      agent.add('Esses atributos extra'); 
      agent.add('Vão te dar vantagens sobre seus inimigos');
      agent.add('Existem três tipos de arcanas:');
      agent.add('Vermelha, Roxa e Verde');
      agent.add('Elas possuem 3 níveis');
      agent.add('E o mais indicado ');
      agent.add('É comprar somente arcanas nvl 3');
      agent.add('E minhas dicas de arcana');
      agent.add('Vão ser para esse nível');
      agent.add('Lembrando que');
      agent.add('Por causa do preço elevado');
      agent.add('O ideal mesmo ');
      agent.add('É começar investindo seu Gold nelas');
      agent.add('Além de serem as melhores');
      agent.add('São as mais utilizadas');
      agent.add('Nos elo mais alto');
      agent.add('Se você quer evoluir na ranked');
      agent.add('Você precisa ter ');
      agent.add('Pelo menos duas página');
      agent.add('De arcanas no nível 3');
      agent.add('Com as arcanas certas');
      agent.add('Seu herói será mais forte');
      agent.add('Que outros');
      agent.add('Que possuirem arcanas inferiores'); 
      agent.add('Caso você seja iniciante');
      agent.add('E não sabe direito ainda');
      agent.add('A classe de herói deseja jogar');
      agent.add('Basta digitar');
      agent.add('´Melhores arcanas para iniciante´');
      agent.add('E caso já saiba');
      agent.add('A classe que quer jogar');
      agent.add('Basta digitar o nome');
      agent.add('Por exemplo:');
      agent.add('´melhores arcanas para mago´');
      agent.add('Lembrando que as classes são:');
      agent.add('Atirador, Assassino, Guerreiro');
      agent.add('Suporte, Tanque e Mago');
      agent.add('Ahh, lembrando ');
      agent.add('É apenas uma sugestão');
      agent.add('Principalmente');
      agent.add('Para quem é novo no jogo');
      agent.add('Agora');
      agent.add('Se você já entende');
      agent.add('E quer uma específica');
      agent.add('Para determinado herói');
      agent.add('Basta solicitar arcanas');
      agent.add('E o nome do herói');
      agent.add('Que eu te falo as melhores');
      agent.add('Segundo os Pro Players!');
      agent.add('Mas e ai');
      agent.add('Quer alguma dica de arcanas?');
      agent.add('Se sim');
      agent.add('É só solicitar conforme expliquei! 😉');
    }

    if (filtro.iniciante) {
      agent.add('As melhores arcanas para iniciante');
      agent.add('São arcanas para Tanks/Suportes');
      agent.add('Pois basicamente');
      agent.add('Funciona com todos os heróis');
      agent.add('E é uma boa alternativa');
      agent.add('Caso você não saiba direito');
      agent.add('Com que tipo de herói');
      agent.add('Você gosta de jogar');
      agent.add('As arcanas são:');
      agent.add('Vermelhas: Indomável');
      agent.add('Roxas: Benevolência');
      agent.add('Verdes: Coragem');
      agent.add('Se você tiver uma página'); 
      agent.add('Com 10 de cada'); 
      agent.add('No total');
      agent.add('A soma disso vai ser:');
      agent.add('+10% de Velocidade de Ataque');
      agent.add('+1162 de HP máximo');
      agent.add('+23 de Armadura');
      agent.add('Regeneração de 52 HP');
      agent.add('a cada 5 segundos');
      agent.add('+4% de Velocidade de movimento');
      agent.add('+6% de redução de recarga de habilidade');
    }

    if (filtro.classe && !filtro.tipo) {
      switch(filtro.classe){
        case 'Mago':
          agent.add('Apesar de serem');
          agent.add('Bem frágeis');
          agent.add('Os Magos são');
          agent.add('Mt mt fortes');
          agent.add('A principal função deles');
          agent.add('É causar dano');
          agent.add('Como a maioria dos heróis do jogo');
          agent.add('Causam somente dano físico');
          agent.add('Basta comprar mais armadura');
          agent.add('Que o dano');
          agent.add('É menor');
          agent.add('Por isso magos são importantes');
          agent.add('São suas habilidades');
          agent.add('Que causam dano mágico');
          agent.add('Ignorando a armadura');
          filtro.tipo = 'AP';
          break;
        case 'Atirador':
          agent.add('Os Atiradores são');
          agent.add('Os heróis com maior dano');
          agent.add('Podendo dizer que');
          agent.add('A defesa deles é o ataque');
          agent.add('Pois são frágeis');
          agent.add('E é por isso');
          agent.add('Que precisam farmar');
          agent.add('E juntar bastante Gold');
          agent.add('Para terminar seus itens');
          agent.add('O mais rápido possível');
          agent.add('E ficar forte');
          agent.add('Para derrubar torres');
          filtro.tipo = 'ADC';
          break;
        case 'Assassino':
          agent.add('Os Assassino são especializados');
          agent.add('Em causar muito dano');
          agent.add('De uma só vez');
          agent.add('Por isso são');
          agent.add('Os mais adequados');
          agent.add('A derrotar montros da Jungle');
          agent.add('E principalmente');
          agent.add('Matar Magos e Atiradores');
          agent.add('Ou quem tiver de bobeira');
          agent.add('Pelo mapa sozinho');
          agent.add('Por isso');
          agent.add('Aproveite bem a moite');
          agent.add('Garantindo o elemento surpresa');
          agent.add('E sempre atacando no momento certo');
          filtro.tipo = 'ADA';
          break;
        case 'Guerreiro':
          agent.add('Guerreiros são parecidos com tanques');
          agent.add('Porém');
          agent.add('Possuem mais dano');
          agent.add('Que um tanque');
          agent.add('O que diminui um pouco sua defesa');
          agent.add('Seu foco é');
          agent.add('Ter um alto dano físico');
          agent.add('Para ataques basicos');
          agent.add('Mas também');
          agent.add('Ter itens de defesa');
          agent.add('Para aguentar dano');
          filtro.tipo = 'AD';
          break;
        case 'Tanque':
          agent.add('A principal função do Tanque');
          agent.add('É proteger o time');
          agent.add('Principalmente');
          agent.add('Seu aliado');
          agent.add('Que mais causa dano');
          agent.add('Como atiradores e magos');
          agent.add('São responsáveis por iniciar as batalhas');
          agent.add('Ter controle de grupo');
          agent.add('Sendo fundametais');
          agent.add('Na decisão de avançar ou recuar');
          agent.add('E o mais importante');
          agent.add('É não morrer');
          agent.add('São eles que protegem o time');
          filtro.tipo = 'Tank';
          break;
        case 'Suporte':
          agent.add('Os suportes foram feitos');
          agent.add('Para estar perto de um aliado');
          agent.add('Seu foco');
          agent.add('É ter controle de grupo');
          agent.add('Porém');
          agent.add('Eles podem causar um pouco de dano');
          agent.add('E apesar de serem');
          agent.add('Os menos populares');
          agent.add('Com eles o time fica');
          agent.add('Muito mais forte');
          filtro.tipo = 'Tank';
          break;
      }
    }

    if(filtro.tipo && !filtro.hero){
      switch(filtro.tipo) {
        case 'AD':
          agent.add('As arcanas mais recomendadas');
          agent.add('Para heróis desse tipo são:');
          agent.add('Indomável, Guerrilha/Tirania (5 de cada) e Ferrão');
          agent.add('Se você tiver uma página'); 
          agent.add('Com 10 de cada'); 
          agent.add('No total');
          agent.add('A soma disso vai ser:');
          agent.add('+637 de HP');
          agent.add('+23 de Armadura');
          agent.add('+2.5% de chance de crítico');
          agent.add('+15% de Velocidade de ataque');
          agent.add('+5% de Velocidade de movimento');
          agent.add('+9 de Dano físico');
          agent.add('+64 de Perfuração de armadura');
          break;
        case 'ADC':
          agent.add('As arcanas mais recomendadas');
          agent.add('Para heróis desse tipo são:');
          agent.add('Atrocidade, Guerrilha e Ferrão');
          agent.add('Se você tiver uma página'); 
          agent.add('Com 10 de cada'); 
          agent.add('No total');
          agent.add('A soma disso vai ser:');
          agent.add('+16% de chance de crítico');
          agent.add('+10% de Velocidade de ataque');
          agent.add('+10% de Velocidade de movimento');
          agent.add('+9 de Dano físico');
          agent.add('+64 de Perfuração de armadura');
          break;
        case 'ADA':
          agent.add('As arcanas mais recomendadas');
          agent.add('Para heróis desse tipo são:');
          agent.add('Massacre, Assassino e Ferrão');
          agent.add('Se você tiver uma página'); 
          agent.add('Com 10 de cada'); 
          agent.add('No total');
          agent.add('A soma disso vai ser:');
          agent.add('+45 de Dano físico');
          agent.add('+100 de Perfuração de armadura');
          agent.add('+10% de Velocidade de movimento');
          break;
        case 'AP':
          agent.add('As arcanas mais recomendadas');
          agent.add('Para heróis desse tipo são:');
          agent.add('Violação, Benevolência e Agitação');
          agent.add('Servem para quase todos (80%) os magos do jogo praticamente.');
          agent.add('E são as mais recomendadas entre os Pro Players!');
          agent.add('Se você tiver uma página'); 
          agent.add('Com 10 de cada'); 
          agent.add('No total');
          agent.add('A soma disso vai ser:');
          agent.add('+42 de Dano mágico');
          agent.add('+88 de Perfuração mágica');
          agent.add('+450 de HP máximo');
          agent.add('Regeneração de 52 HP a cada 5 segundos');
          agent.add('+4% de Velocidade de movimento');
          agent.add('+6% de Velocidade de ataque');
          break;
        case 'Tank':
          agent.add('As arcanas mais recomendadas');
          agent.add('Para heróis desse tipo são:');
          agent.add('Indomável, Benevolência e Coragem');
          agent.add('É a melhor opção para os suportes e tanks do jogo');
          agent.add('Se você tiver uma página'); 
          agent.add('Com 10 de cada'); 
          agent.add('No total');
          agent.add('A soma disso vai ser:');
          agent.add('+10% de Velocidade de Ataque');
          agent.add('+1162 de HP máximo');
          agent.add('+23 de Armadura');
          agent.add('Regeneração de 52 HP a cada 5 segundos');
          agent.add('+4% de Velocidade de movimento');
          agent.add('+6% de redução de recarga de habilidade');
          break;  
      }
    }

    if(filtro.hero) {

      switch(filtro.hero){

        case 'Airi':
    
          agent.add('As arcanas recomendadas para ir de Airi são:');
          agent.add('Vermelhas: Massacre 10x');
          agent.add('Roxas: Benevolência 10x');
          agent.add('Verdes: Ferrão x10');
          break; 

        case 'Aleister':

          agent.add('As arcanas recomendadas para jogar de Aleister são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');
          break;

        case 'Alice':

          agent.add('As arcanas recomendadas para jogar de Alice são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Amily':

          agent.add('As arcanas recomendadas para jogar de Amily são:');
          agent.add('Vermelhas: Massacre x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Annette':

          agent.add('As arcanas recomendadas para jogar de Annette são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Arduin':

          agent.add('As arcanas recomendadas para jogar de Arduin são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Arthur':

          agent.add('As arcanas recomendadas para jogar de Arthur são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Arum':

          agent.add('As arcanas recomendadas para jogar de Arum são:'); 
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Astrid':

          agent.add('As arcanas recomendadas para jogar de Astrid são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Azzenka':

          agent.add('As arcanas recomendadas para jogar de Azzen´ka são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');         
          break;

        case 'Baldum':

          agent.add('As arcanas recomendadas para jogar de Baldum são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Batman':

          agent.add('As arcanas recomendadas para jogar de Batman são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10'); 
          break;

        case 'Butterfly':

          agent.add('As arcanas recomendadas para jogar de Butterfly são:'); 
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10'); 
          break;       

        case 'Capheny':

          agent.add('Infelizmente ainda não está em nosso servidor');
          agent.add('Assim que tiver noticias dela, te informo melhor, ta bom?');
          break;

        case 'Chaugnar':

          agent.add('As arcanas recomendadas para jogar de Chaugnar são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Cresht':

          agent.add('As arcanas recomendadas para jogar de Cresht são:'); 
          agent.add('Vermelhas: Massacre x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Ferrão x10');  
          break;

        case 'Darcy':

          agent.add('As arcanas recomendadas para jogar de D´Arcy são: ');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Agitação x10'); 
          break;  

        case 'Diaochan':

          agent.add('As arcanas recomendadas para jogar de Diaochan são:'); 
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');         
          break; 

        case 'Elsu':

          agent.add('As arcanas recomendadas para jogar de Elsu são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;  

        case 'Errol':

          agent.add('Infelizmente ainda não está em nosso servidor');
          agent.add('Assim que tiver noticias dele, te informo melhor, ta bom?'); 
          break;

        case 'Fennik':

          agent.add('As arcanas recomendadas para jogar de Fennik são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Florentino':

          agent.add('Eita, quer apelar mesmo de Florentino ein?');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Ferrão x10');  
          break;


        case 'Gildur':

          agent.add('As arcanas recomendadas para jogar de Gildur são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break; 

        case 'Grakk':

          agent.add('As arcanas recomendadas para jogar de Grakk são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Hayate':

          agent.add('As arcanas recomendadas para jogar de Hayate são:');
          agent.add('Vermelhas: Massacre x4 / Blitz x6');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10'); 
          break;

        case 'Ignis':

          agent.add('As arcanas recomendadas para jogar de Ignis são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Maldição x10');  
          break;

        case 'Ilumia':

          agent.add('As arcanas recomendadas para jogar de Ilumia são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');         
          break; 

        case 'Jinnar':

          agent.add('As arcanas recomendadas para jogar de Jinnar são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break; 

        case 'Kahlii':
 
          agent.add('As arcanas recomendadas para jogar de Kahlii são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;  

        case 'KilGroth':

          agent.add('As arcanas recomendadas para jogar de Kil´Groth são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Kriknak':

          agent.add('As arcanas recomendadas para jogar de Kriknak são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');   
          break;

        case 'Krixi':

          agent.add('As arcanas recomendadas para jogar de Krixi são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;

        case 'Lauriel':

          agent.add('As arcanas recomendadas para jogar de Lauriel são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Maldição x10'); 
          break;

        case 'Liliana':

          agent.add('As arcanas recomendadas para jogar de Liliana são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;

        case 'Lindis':

          agent.add('As arcanas recomendadas para jogar de Lindis são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'LuBu':

          agent.add('As arcanas recomendadas para jogar de Lu Bu são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Lumburr':

          agent.add('As arcanas recomendadas para jogar de Lumburr são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Maloch':

          agent.add('As arcanas que eu te recomendo são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Marja':

          agent.add('As arcanas recomendadas para jogar de Marja são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');          
          break;

        case 'Max':

          agent.add('As arcanas recomendadas para jogar de Max são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Mganga':

          agent.add('As arcanas recomendadas para jogar de Mganga são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');
          break;

        case 'Mina':

          agent.add('As arcanas recomendadas para jogar de Mina são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Moren':

          agent.add('As arcanas recomendadas para jogar de Moren são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Murad':

          agent.add('As arcanas recomendadas para jogar de Murad são:');
          agent.add('Vermelhas: Blitz x10');
          agent.add('Roxas: Guerrilha x6 / Ladrão x4');
          agent.add('Verdes: Ferrão x10');
          break; 

        case 'Nakroth':

          agent.add('As arcanas recomendadas para jogar de Nakroth são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Guerrilha x5 / Ladrão x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Natalya':

          agent.add('As arcanas recomendadas para jogar de Natalya são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;

        case 'Omega':

          agent.add('As arcanas recomendadas para jogar de Omega são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Ormarr':

          agent.add('As arcanas recomendadas para jogar de Ormarr são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Omen':

          agent.add('As arcanas recomendadas para jogar de Omen são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Peura':

          agent.add('As arcanas recomendadas para jogar de Peura são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Preyta':

          agent.add('As arcanas recomendadas para jogar de Preyta são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;

        case 'Quillen':

          agent.add('As arcanas recomendadas para jogar de Quillen são:');
          agent.add('Vermelhas: Descontrole x10');
          agent.add('Roxas: Assassino x5 / Guerillha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Raz':

          agent.add('As arcanas recomendadas para jogar de Raz são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;

        case 'Riktor':

          agent.add('As arcanas recomendadas para jogar de Riktor são:');
          agent.add('Vermelhas: Massacre x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Rourke':

          agent.add('As arcanas recomendadas para jogar de Rourke são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Roxie':

          agent.add('As arcanas recomendadas para jogar de Roxie são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');
          break;

        case 'Ryoma':

          agent.add('As arcanas recomendadas para jogar de Ryoma são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10'); 
          break;

        case 'Sephera':

          agent.add('As arcanas recomendadas para jogar de Sephera são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Maldição x10'); 
          break;

        case 'Skud':

          agent.add('As arcanas recomendadas para jogar de Skud são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10'); 
          break;  

        case 'Slimz':

          agent.add('As arcanas recomendadas para jogar de Slimz são:'); 
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Superman':

          agent.add('As arcanas recomendadas para jogar de Superman são:'); 
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Taara':

          agent.add('As arcanas recomendadas para jogar de Taara são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'TeeMee':

          agent.add('As arcanas recomendadas para jogar de TeeMee são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'TelAnnas':

          agent.add('As arcanas recomendadas para jogar de Tel´Annas são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;


        case 'Thane':

          agent.add('As arcanas recomendadas para jogar de Thane são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'TheFlash':

          agent.add('As arcanas recomendadas para jogar de Flash são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;


        case 'TheJoker':

          agent.add('As arcanas recomendadas para jogar de Coringa são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');   
          break;

        case 'Toro':

          agent.add('Infelizmente ele não está em nosso servidor');
          break;

        case 'Tulen':

          agent.add('As arcanas recomendadas para jogar de Tulen são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');
          break;

        case 'Valhein':

          agent.add('As arcanas recomendadas para jogar de Valhein são:');
          agent.add('Vermelhas: Blitz x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Agitação x10');
          break;

        case 'Veera':

          agent.add('Você quis dizer, Valhein AP?');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitação x10');     
          break;

        case 'Veres':

          agent.add('As arcanas recomendadas para jogar de Veres são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10'); 
          break;

        case 'Violet':

          agent.add('As arcanas recomendadas para jogar de Violet são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Wiro':

          agent.add('As arcanas recomendadas para jogar de Wiro são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Wisp':

          agent.add('As arcanas recomendadas para jogar de Wisp são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Wonder Woman':

          agent.add('As arcanas recomendadas para jogar de Mulher Maravilha são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Wukong':

          agent.add('As arcanas recomendadas para jogar de Wukong são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Xeniel':

          agent.add('As arcanas recomendadas para jogar de Xeniel são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'YBneth':

          agent.add('As arcanas recomendadas para jogar de Y´bneth são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Coragem x10');
          break;

        case 'Yorn':

          agent.add('As arcanas recomendadas para jogar de Yorn são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Zanis':

          agent.add('As arcanas recomendadas para jogar de Zanis são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Zephys':

          agent.add('As arcanas recomendadas para jogar de Zephys são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Ferrão x10');
          break;

        case 'Zill':

          agent.add('As arcanas recomendadas para jogar de Zill são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Agitação x10');
          break;

        case 'Zuka':

          agent.add('As arcanas recomendadas para jogar de Zuka são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Ferrão x10'); 
          break;
      } 
    }
 }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                               intentMap                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  let intentMap = new Map();

  intentMap.set('checarBuild', testando); 

  intentMap.set('checarBuild', checarBuild);
  
  intentMap.set('checarBoots', checarBoots);

  intentMap.set('listarAlgo', listarAlgo);

  intentMap.set('detalharItens', detalharItens);

  intentMap.set('checarArcanas', checarArcanas);

  intentMap.set('ultimasBuilds', ultimasBuilds);

  intentMap.set('listar_menu', listar_menu);

  agent.handleRequest(intentMap);

});
