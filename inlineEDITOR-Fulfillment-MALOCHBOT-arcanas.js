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
const AMILY_2_URL             = 'https://imgur.com/wxoTfAW.jpg';
const AMILY_JG_URL            = 'https://imgur.com/8f6LPRf.jpg';
const ANNETE_URL              = 'https://imgur.com/vugGM4U.jpg';
const ANNETE_2_URL            = 'https://imgur.com/Rrde3p5.jpg';
const ANNETE_3_URL            = 'https://imgur.com/a1qj9Aa.jpg';
const ARDUIN_URL              = 'https://imgur.com/qaEbbY0.jpg';
const ARDUIN_2_URL            = 'https://imgur.com/xjvn5eh.jpg';
const ARDUIN_SUP_URL          = 'https://imgur.com/tb7LekD.jpg';
const ARTHUR_URL              = 'https://imgur.com/Lt4u18a.jpg';
const ARUM_SOLO_URL           = 'https://imgur.com/kau4e65.jpg';
const ARUM_SUPORTE_URL        = 'https://imgur.com/SFmP2ST.jpg';
const ASTRID_URL              = 'https://imgur.com/hOgNLiF.jpg';
const ASTRID_2_URL            = 'https://imgur.com/OifK29M.jpg';
const ASTRID_JG_URL           = 'https://imgur.com/EJcDD5W.jpg';
const AZZENKA_URL             = 'https://imgur.com/QnyDNsi.jpg';
const BALDUM_URL              = 'https://imgur.com/7jMf2n7.jpg';
const BALDUM_2_URL            = 'https://imgur.com/tHEMoGz.jpg';
const BALDUM_SOLO_URL         = 'https://imgur.com/tLQjb78.jpg';
const BATMAN_URL              = 'https://imgur.com/jUjPPns.jpg';
const BUTTERFLY_AD_URL        = 'https://imgur.com/Uu5PMbN.jpg';
const BUTTERFLY_TANK_URL      = 'https://imgur.com/wathWg2.jpg';
const CAPHENY_LANE_URL        = 'https://imgur.com/ywPtZ5M.jpg';
const CAPHENY_LANE2_URL       = 'https://imgur.com/XFOSKjm.jpg';
const CAPHENY_LANE3_URL       = 'https://imgur.com/t2zgSkQ.jpg';
const CAPHENY_JG_URL          = 'https://imgur.com/91yUc0g.jpg';
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
const ERROL_SOLO_URL          = 'https://imgur.com/veD54DX.jpg';
const ERROL_JG_URL            = 'https://imgur.com/HJQOdiL.jpg';
const ERROL_JG2_URL           = 'https://imgur.com/M6G6ZBw.jpg';
const ERROL_TROLL_URL         = 'https://imgur.com/YnahHwp.jpg';
const FENNIK_URL              = 'https://imgur.com/KLhS9S4.jpg';
const FENNIK_2_URL            = 'https://imgur.com/BVUKQz3.jpg';
const FLORENTINO_OLD_URL      = 'https://i.imgur.com/hHPwhJp.jpg';
const FLORENTINO_URL          = 'https://imgur.com/jjtgA0L.jpg';
const FLORENTINO_2_URL        = 'https://imgur.com/ae5J91l.jpg';
const FLORENTINO_JG_URL       = 'https://i.imgur.com/wxZjp2L.jpg';
const GILDUR_AP_URL           = 'https://i.imgur.com/GE2Laoq.jpg';
const GILDUR_SUPORTE_URL      = 'https://i.imgur.com/EpLwARh.jpg';
const GRAKK_URL               = 'https://i.imgur.com/dq8Fg49.jpg';
const HAYATE_JG_1_URL         = 'https://i.imgur.com/lRN58eR.jpg';
const HAYATE_JG_2_URL         = 'https://i.imgur.com/8I25sn9.jpg';
const HAYATE_LANE_OLD_URL     = 'https://i.imgur.com/fKzptzn.jpg';
const HAYATE_LANE_URL         = 'https://imgur.com/V1RfE9z.jpg';
const IGNIS_URL               = 'https://i.imgur.com/Py4TI4b.jpg';
const ILUMIA_URL              = 'https://imgur.com/plkKEGm.jpg';
const ILUMIA_2_URL            = 'https://imgur.com/zwh85GH.jpg';
const JINNAR_URL              = 'https://i.imgur.com/iyrozwe.jpg';
const KAHLII_URL              = 'https://i.imgur.com/xvVwP4v.jpg';
const KILGROTH_URL            = 'https://imgur.com/6Jho5cM.jpg';
const KILGROTH_2URL           = 'https://imgur.com/hLlppFl.jpg';
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
const RIKTOR_SOLO_OLD_URL     = 'https://i.imgur.com/KNyNiAf.jpg';
const RIKTOR_SOLO_URL         = 'https://imgur.com/vTu9cgE.jpg';
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
const YENA_1_URL              = 'https://imgur.com/91HBq0z.jpg';
const YENA_2_URL              = 'https://imgur.com/1ZT7xCK.jpg';
const YORN_URL                = 'https://i.imgur.com/lr5DiJi.jpg';
const ZANIS_URL               = 'https://i.imgur.com/jtraB2D.jpg';
const ZANIS_OFF_TANKURL       = 'https://i.imgur.com/SbYtVUR.jpg';
const ZEPHYS_AD_URL           = 'https://i.imgur.com/NJGs43s.jpg';
const ZEPHYS_TANK_URL         = 'https://i.imgur.com/V5ocM82.jpg';
const ZILL_URL                = 'https://i.imgur.com/RC62pgL.jpg';
const ZUKA_URL                = 'https://i.imgur.com/93Hu2Jl.jpg';

////////////////////////////////////////////////////////////////////
//                   Lista de Roles por Heroi  HEROINOVO          //
////////////////////////////////////////////////////////////////////

const HEROIS_SOLO     = ["Florentino", "Riktor", "Maloch", "Marja", "Superman", "Xeniel", "Omen", "YBneth", "Cresht", 
                        "Ryoma", "Max", "Arum", "Wonder Woman", "Skud", "Airi", "Roxie", "Amily", "LuBu", "Zephys", 
                        "Arduin", "Rourke", "Zuka", "Baldum", "Arthur", "Omega", "KilGroth", "Zanis", "Gildur", 
                        "Wukong", "Astrid", "Taara", "Veres", "Valhein", "Errol", "Yena"];

const HEROIS_LANE     = ["Elsu", "TelAnnas", "Valhein", "TheJoker", "Yorn", "Wisp", "Lindis", "Violet", "Fennik", "Moren", "Hayate", "Capheny"];

const HEROIS_MID      = ["Elsu", "Sephera", "Tulen", "Liliana", "Raz", "Ignis", "Natalya", "TheFlash", "Kahlii", "Lauriel", 
                        "Aleister", "Ilumia", "Jinnar", "Mganga", "Krixi", "Diaochan", "Preyta", "Gildur", "Veera", "Azzenka", 
                        "Annette", "Darcy"];

const HEROIS_SUPORTE  = ["Annette", "YBneth", "Gildur", "TeeMee", "Baldum", "Sephera", "Peura", "Mina", "Grakk", "Chaugnar", "Alice",
                        "Arum", "Thane", "Ormarr", "Cresht", "Riktor", "Xeniel", "Lumburr", "Arduin", "Superman", "Aleister", "Diaochan", "Errol"];

const HEROIS_JUNGLE   = ["Lindis", "Rourke", "Quillen", "Violet", "Nakroth", "Zephys", "Murad", "Elsu", "Kriknak", "Zill", 
                        "Slimz", "Ryoma", "Moren", "Zanis", "Wukong", "Wisp", "Fennik", "Butterfly", "Tulen", "Raz", "Batman", 
                        "Wonder Woman", "Astrid", "Airi", "Amily", "Zuka", "Florentino", "Darcy", "Hayate", "Capheny","Errol"];

////////////////////////////////////////////////////////////////////
//                    TESTE de Herois Objeto                      //
////////////////////////////////////////////////////////////////////

// const AIRI_META = {
//   "heroi" : "Airi",
//   "meta" : {
//     "builds" : { 
//       "Solo" : { 
//         "properties" : {
//           "build_url": { "1" : AIRI_LANE_URL },
//           "dicas": { "1" : "blablabla", "2" : "blablabla", "3" : "blablabla" },
//           "talentos": { "1" : talento_executar},
//           "arcana": {"vermelha": "", "roxa": "", "verde":""}
//         }
//       },
//       "Jungle" : { 
//         "properties" : {
//           "build_url": { "1" : AIRI_LANE_URL },
//           "dicas": { "1" : "blablabla", "2" : "blablabla", "3" : "blablabla" },
//           "talentos": { "1" : talento_punir},
//           "arcana": {"vermelha": "", "roxa": "", "verde":""}
//         }
//       },
//     },
//     "arcanas" : {
//       "listas" : [{"vermelha": "", "roxa": "", "verde":""}, {"vermelha": "", "roxa": "", "verde":""}],
//       "opcional" : [{"vermelha": "", "roxa": "", "verde":""}],
//     }
//   }
// };

////////////////////////////////////////////////////////////////////
//                     Lista de falas padrão                      //
////////////////////////////////////////////////////////////////////

const SIMBOLOS = ["+", "^", "#", "~"];
const FUNCAO_ERRADA_1 = "Poxa, achei que você não era troll...";
const FUNCAO_ERRADA_2 = "Mas infelizmente você é :(";
const BUILD_EM_BREVE = "Me pergunta depois, nesse momento to pesquisando novas builds para esse herói!";


////////////////////////////////////////////////////////////////////
//                     Lista de Imagens Dicas                     //
////////////////////////////////////////////////////////////////////

const minimap_lane   = 'https://imgur.com/OsV1TTX.jpg';
const rotacao_jungle = 'https://imgur.com/CqkiSZ5.jpg';
const itens_jungle   = 'https://imgur.com/RO8NInz.jpg';

////////////////////////////////////////////////////////////////////
//                     Lista de itens ImgURL                      //
////////////////////////////////////////////////////////////////////

const BOOTS           = 'https://imgur.com/LRETxQ5.jpg';
const SONIC_BOOTS     = 'https://imgur.com/RREgc7r.jpg';
const GILDED_BOOTS    = 'https://imgur.com/CxIV6RT.jpg';
const FLASHY_BOOTS    = 'https://imgur.com/Mch6l2p.jpg';
const ENCHANTED_BOOTS = 'https://imgur.com/hsP2pCL.jpg';
const WAR_BOOTS       = 'https://imgur.com/5IdduzO.jpg';
const HERMES_BOOTS    = 'https://imgur.com/4ya8Bov.jpg';


const ESSENCIAVENTO_SUP  = 'https://imgur.com/FrOCWr9.jpg';
const ANELAMIGO_SUP      = 'https://imgur.com/bXfqq2l.jpg';
const MARCAPOSEIDON_SUP  = 'https://imgur.com/49qLAdm.jpg';
const BRACADEIRA_SUP     = 'https://imgur.com/39p5vAk.jpg';

const talento_flick              = 'https://imgur.com/JTvWpkp.jpg';
const talento_punir              = 'https://imgur.com/u4FlCtT.jpg';
const talento_frosty             = 'https://imgur.com/bmd9FOv.jpg';
const talento_curar              = 'https://imgur.com/XAwDaEV.jpg';
const talento_executar           = 'https://imgur.com/sT2ulCU.jpg';
const talento_inativarTorre      = 'https://imgur.com/yFdlflS.jpg';
const talento_atordoar           = 'https://imgur.com/4eOzXzU.jpg';
const talento_purificar          = 'https://imgur.com/AZf7cZi.jpg';
const talento_sprint             = 'https://imgur.com/q8vAXah.jpg';

////////////////////////////////////////////////////////////////////
//                     Lista de memes ImgURL                      //
////////////////////////////////////////////////////////////////////

const TRISTE_URL         = '';

const FELIZ_URL          = '';

const CONCLUIDO          = '';

////////////////////////////////////////////////////////////////////
//              Lista de Ultimas Builds Adicionadas 08/03/2018    //
////////////////////////////////////////////////////////////////////

const ultimasAtualizacoes_1 = "Últimos heróis adicionados: Capheny, Errol, Yena!\n\nÚltimas builds adicionadas: Kilgroth, Astrid, Amily, Florentino, Arduin\n\nBuilds atualizadas de acordo com patch de abril/2019";
const ultimasAtualizacoes_2 = "";
const ultimasAtualizacoes_3 = "";

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

const info_AoV = {"termo":"AoV", "definicao":"É a abreviação do nome Arena of Valor"};
const info_pvp = {"termo":"pvp", "definicao":"É a abreviação de Player vs Player, que significa, jogador vs jogador. Em outras palavras, você joga contra pessoas reais."};
const info_bots = {"termo":"bots", "definicao":"É tipo um parente meu, mas que foi programado para jogar ao invés falar com você."};
const info_hp = {"termo":"hp", "definicao":"É a abreviação de Hit Points, que significa a quantidade de vida que um herói tem."};
const info_mp = {"termo":"mp", "definicao":"É a abreviação de Mana Points, que significa a quantidade de mana que um herói tem."};
const info_AD = {"termo":"AD", "definicao":"É a abreviação de Attack Damage, pode se referir a quantidade de dano que um herói dá com ataques normais, ou um tipo de herói que causa dano físico."};
const info_AP = {"termo":"AP", "definicao":"É a abreviação de Ability Power, pode se referir a quantidade de poder de habilidade que um herói tem, ou um tipo de herói que causa dano mágico."};
const info_OP = {"termo":"OP", "definicao":"É a abreviação de overpowered, mas de forma geral significa que aquele herói ou item ou arcana ou habilidade é muito forte."};
const info_Nerf = {"termo":"Nerf", "definicao":"É quando um herói ou item ou monstro do jogo sofre um ajuste em seus atributos e ficam mais fracos."};
const info_gank = {"termo":"gank", "definicao":"É a abreviação de Gang Kill, significa que um grupo de heróis se junta para atacar os inimigos, sem que o time inimigo perceba."};
const info_farm = {"termo":"farm", "definicao":"Refere-se ao ato de matar os minions da sua lane, da jungle ou outro monstro, para ganhar gold e experiência."};
const info_burst = {"termo":"burst", "definicao":"Refere-se a um herói que é capaz de causar muito dano em pouco tempo. Também conhecido como dano explosivo. Magos geralmente possuem essa capacidade, assim como alguns assassinos."};
const info_cooldown = {"termo":"Cooldown", "definicao":"É o tempo de espera para se usar uma habilidade"};
const info_CDR = {"termo":"CDR", "definicao":"É a abreviação de cooldown reduction, que significa redução de tempo de espera"};
const info_autoattack = {"termo":"autoattack", "definicao":"Refere-se ao ataque básico normal de todo herói."};
const info_poke = {"termo":"Poke", "definicao":"É quando um herói é capaz de causar dano a uma longa distância, de forma que ele possa abusar dessa habilidade sem sofrer nenhum dano do inimigo."};
const info_carry = {"termo":"Carry", "definicao":"É o herói capaz de ganhar partidas. A medida que o tempo do jogo aumenta, e mais o herói consegue farmar mais forte ele fica."};
const info_ADC = {"termo":"ADC", "definicao":"Refere-se a um herói capaz de ganhar partidas e são fortes causando dano físico. Geralmente o termo ADC é designado a atiradores, mas alguns guerreiros ou assassinos podem também ser considerados ADC."};
const info_TF = {"termo":"TF", "definicao":"Refere-se a batalha entre os heróis dos dois times que pode ocorrer em alguma área do mapa."};
const info_Roam = {"termo":"Roam", "definicao":"Refere-se ao ato de se mover pelo mapa de forma estratégica, dando visão de mapa para o time, enquanto procura oportunidades de ganks, kills e objetivos"};
const info_SplitPush = {"termo":"SplitPush", "definicao":"Refere-se ao ato de se separar do time para puxar sozinho uma lane, forçando o time inimigo se dividir para defender pontos diferentes de ataque."};
const info_proxy = {"termo":"proxy", "definicao":"Refere-se ao ato de farmar entre as torres 1 e torres 2 de uma lane. Geralmente feita na solo lane por players experientes. Você limpa a wave de minions antecipadamente e força o solo inimigo a defender a torre enquanto você fica livre para rotacionar pelo mapa."};
const info_flick = {"termo":"flick", "definicao":"É o talento de teletransporte, chamado de instante."};
const info_feedar = {"termo":"feedar", "definicao":"É o ato de morrer propositalmente para um herói inimigo, fazendo esse herói ficar muito forte."};
const info_buff = {"termo":"buff", "definicao":"Pode significar que um herói ou item após um ajuste ficou mais forte, ou quando após usar uma habilidade o herói alvo se torna mais forte."};
const info_stack = {"termo":"Stack", "definicao":"Refere-se aos benefícios incrementais obtidos ao realizar uma determinada tarefa, como matar um herói ou monstro."};
const info_bait = {"termo":"bait", "definicao":"É quando você aparece numa posição favorável para o time inimigo te gankar, porém você faz isso de propósito enquanto jogadores do seu time estão escondidos esperando esse gank do time inimigo, para surpreender eles e seu time ter a vantagem da luta."};
const info_dive = {"termo":"dive", "definicao":"É quando seu time ignora o dano que vai sofrer da torre e entra dentro do raio dela para matar algum inimigo. Geralmente é feito quando algum membro do time tem o talento inativar torre ou quando o tank do time entra primeiro no raio, pois assim ele vai aguentar o dano da torre."};
const info_bush = {"termo":"bush", "definicao":"Também conhecido como matinho ou moita e espalhado em diversas partes do mapa, a bush é o nome comum usado para definir a região do matinho. Nessas regiões você consegue se esconder e somente com habilidades de revelação ou entrando na mesma bush, é que seu inimigo vai conseguir te ver."};
const info_range = {"termo":"range", "definicao":"É o alcance da habilidade, geralmente atribuido a heróis que podem usar habilidades a longo alcance, seja um atirador com seu auto attack ou um mago usando habilidades"};
const info_melee = {"termo":"melee", "definicao":"É o termo dado a heróis ou habilidades de curto alcance, que só causam dano quando próximos do inimigo"};
const info_frontline = {"termo":"frontline", "definicao":"É o que chamamos de linha de frente de uma batalha, geralmente são os tanks e guerreiros que pulam na frente e conseguem aguentar bastante dano para proteger a backline"};
const info_backline = {"termo":"backline", "definicao":"É o que chamamos de linha de trás de uma batalha, geralmente são magos e atiradores que jogam de forma recuada, podendo usar habilidades e atacar sem sofrer dano. Sendo portanto o foco dos assassinos que chegam por trás na tf"};
const info_kit = {"termo":"kit", "definicao":"É o conjunto de habilidades e mecânicas de cada herói."};

const globalGlossario = [info_kit,info_backline,info_frontline,info_melee,info_range,info_AoV,info_pvp,info_bots,info_hp,info_mp,info_AD,info_AP,info_OP,info_Nerf,info_gank,info_farm,info_burst,info_cooldown,info_CDR,info_autoattack,info_poke,info_carry,info_ADC,info_TF,info_Roam,info_SplitPush,info_proxy,info_flick,info_feedar,info_buff,info_stack,info_bait,info_dive,info_bush];

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

  function ultimasAtualizacoes(agent){

    //agent.add("Só um instante");
    //agent.add("Pronto, atualizei as builds dos seguintes heróis:");
    agent.add(ultimasAtualizacoes_1);
    //agent.add('Caso esteja sentindo falta de alguma build');
    //agent.add('É só comentar no post fixo da página que em breve eu adiciono aqui!');       

  }

  function listar_menu(agent){
    agent.add("Serviços do Maloch Bot:");
    agent.add("Builds - digite:\n\n´build [herói] (lane)´");
    agent.add("Arcanas - digite:\n\n´arcanas informações´ - menu de arcanas\n\n´arcanas [herói] ou arcanas [classe]´");
    agent.add("Últimas atualizações do bot - digite:\n\n´últimas atualizações´");
    agent.add("Legenda: entre [] é obrigatório, entre () opcional");
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
          agent.add('Botas de Velocidade, Botas Sônicas, Bota Dourada, Botas Ofuscantes, Chutes Encatados, Botas de Guerra, Escolha de Hermes');
          agent.add('Para saber mais detalhes de cada uma digite ´detalhar nome da bota´');
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

  function glossarioExplicar(agent){
    const glossario = agent.parameters.Conceitos;
    const termo     = agent.parameters.glossaryTerms;
    var i;
    
    if(!termo){
      agent.add('Não entendi o termo que você disse, tenta de outro jeito!');
    }

    if(glossario && termo){
      for (i in globalGlossario){
        if(globalGlossario[i].termo == termo){
          agent.add(globalGlossario[i].definicao);
        }
      }
    }
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 BUILDS                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function checarBuild(agent) {

    const heroi      = agent.parameters.Heroi;
    const build      = agent.parameters.Builds;
    const role       = agent.parameters.role;
    const informacao = agent.parameters.informacao;

    let filtro = { hero:heroi, funcao:role, info: informacao}; 
    
    if (build && !filtro.hero && !filtro.info && !filtro.funcao) {
      agent.add('Entendi que você quer builds, mas de qual herói? Se quiser listar meus comandos, basta digitar: ´builds informações´');
    } 

    if (build && !filtro.hero && !filtro.info && filtro.funcao) {
      agent.add('Entendi que você quer jogar como '+filtro.funcao+', mas com qual herói? Se quiser listar meus comandos, basta digitar: ´builds informações´');
    } 

    if(build && filtro.info){
      agent.add('Para solicitar builds digite:\n\n´build [herói] (lane)´');
      agent.add("Legenda: entre [] é obrigatório, entre () opcional");
    }

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
          agent.add(new Image(AMILY_2_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas:');
                agent.add(new Image(AMILY_URL));
                agent.add(new Image(AMILY_2_URL));
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
          agent.add(new Image(ARDUIN_2_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas:');
                agent.add(new Image(ARDUIN_URL));
                agent.add(new Image(ARDUIN_2_URL));
                break;
              case 'Suporte':
                agent.add('Tenho essa:');
                agent.add(new Image(ARDUIN_SUP_URL));
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
          agent.add(new Image(ASTRID_2_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas:');
                agent.add(new Image(ASTRID_URL));
                agent.add(new Image(ASTRID_2_URL));
                break;
              case 'Jungle':
                agent.add('Aqui está:');
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
          agent.add('Aqui está:');
          agent.add(new Image(AZZENKA_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Aqui está:');
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
        if (!filtro.funcao) {
          agent.add('Caso seja iniciante, o ideal é começar por essa build aqui:');
          agent.add(new Image(BUTTERFLY_TANK_URL));
          agent.add('Mas se você já domina a jungle, pode seguir com essa outra.');
          agent.add(new Image(BUTTERFLY_AD_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
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

        agent.add('Hm, então quer dizer que resolveu jogar de Capheny...');
        if (!filtro.funcao) {
          agent.add('Tenho builds na lane e na jungle');
          agent.add(new Image(CAPHENY_LANE3_URL));
          agent.add(new Image(CAPHENY_JG_URL));
          } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Aqui, tenho essa:');
                agent.add(new Image(CAPHENY_LANE3_URL));
                agent.add('Mas dependendo do time inimigo, pode ser assim também:');
                agent.add(new Image(CAPHENY_LANE2_URL));;
                break;
              case 'Jungle':
                agent.add('Aqui oh:');
                agent.add(new Image(CAPHENY_JG_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Capheny é melhor se utilizada na lane ou na jungle!');
          }
        }
        break;

      case 'Chaugnar':

        agent.add('Hm, então quer dizer que resolveu jogar de Chaugnar...');
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

        agent.add('Hm, então quer dizer que resolveu jogar de Errol...');
        if (!filtro.funcao) {
          agent.add('Tenho builds na jungle e na lane do Demônio');
          agent.add('Caso jogue na solo, da uma testada nessa:'); 
          agent.add(new Image(ERROL_SOLO_URL));
          agent.add('Caso jogue na jungle'); 
          agent.add(new Image(ERROL_JG_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui, tenho essa:');
                agent.add(new Image(ERROL_SOLO_URL));
                agent.add('Seu foco é split push e ganks no mid!');
                break;
              case 'Jungle':
                agent.add('Posso te sugerir qualquer uma dessas:');
                agent.add(new Image(ERROL_JG_URL));
                agent.add(new Image(ERROL_JG2_URL));
                agent.add('Seu foco aqui é participar de ganks e caso tenha um assassino no outro time te indico a segunda!');
                break;
              case 'Suporte':
                agent.add('Olha não te indico muito mas já que vc quer');
                agent.add(new Image(ERROL_TROLL_URL));
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Errol é melhor se utilizado na Solo ou na Jungle!');
          }
        }
        break;

      case 'Fennik':

        agent.add('Hm, então quer dizer que resolveu jogar de Fennik...');
        if (!filtro.funcao) {
          agent.add('Aqui, tenho duas:');
          agent.add(FENNIK_URL);
          agent.add(FENNIK_2_URL);
                agent.add('Se você tiver iniciando com ele, te recomendo a primeira!');
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

        agent.add('Hm, então quer dizer que resolveu jogar de Florentino?');
        if (!filtro.funcao) {
          agent.add('Aqui oh:');
          agent.add(new Image(FLORENTINO_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Pronto, achei uma build:');
                agent.add(new Image(FLORENTINO_JG_URL));
                break;
              case 'Solo':
                agent.add('Tenho essas:');
                agent.add(new Image(FLORENTINO_URL));
                agent.add(new Image(FLORENTINO_2_URL));
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
        if (!filtro.funcao) {
          agent.add('Tenho duas');
          agent.add(new Image(KILGROTH_URL));
          agent.add(new Image(KILGROTH_2URL));
          agent.add('A primeira é pra usar com punir, a segunda quando estiver sem punir');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas:');
                agent.add(new Image(KILGROTH_URL));
                agent.add(new Image(KILGROTH_2URL));
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
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui, tenho essas:');
                agent.add(new Image(MALOCH_URL));
                agent.add(new Image(MALOCH_2_URL));
                agent.add('Se você for iniciante, te recomendo a primeira!');
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

        agent.add('Hm, então quer dizer que resolveu jogar de Veera...');
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
    
      case 'Yena':

        agent.add('Hm, então quer dizer que resolveu jogar de Yena...');
        if (!filtro.funcao) {
          agent.add('Pronto, tenho duas');
          agent.add(new Image(YENA_1_URL)); 
          agent.add(new Image(YENA_2_URL)); 
          agent.add('A primeira é mais comum, a segunda é pra quando seu time ta carente de tank');
          agent.add('Minha dica para jogar com ela é entender bem os dois modos de combate que ela tem');
          agent.add('O primeiro modo é o modo assassino, nele sua velocidade de movimento é aumentada\n\nEnquanto o segundo é seu modo guerreiro, sua velocidade de ataque diminui mas aumenta o dano em 50%\n\nPara trocar de modo você deve usar sua ULT');
          agent.add('Lembrando que a cada golpe (ataque básico ou habilidade) que ela dá no inimigo no modo assassino acumula um stack, ao somar 5 stacks, o inimigo toma silence e reduz o movimento em 80%!');
          agent.add('Sua primeira skill no modo assassino pode ser usada duas vezes se acertar um minion ou herói na primeira vez\n\nE no modo guerreiro é possível mudar a direção enquanto carrega a habilidade usando flick ou pode ser usada imediatamente apertando duas vezes');
          agent.add('Enquanto usa sua segunda habilidade no modo guerreiro, você fica imune a controle, portanto saiba combar bem com isso\n\nAlém disso, sua segunda skill no modo assassino arremessa uma shuriken que ao ser coletada reduz o cooldown da mesma em 5 segundos, seu combo geralmente começa aqui');
          agent.add('O combo mais comum é:\n\nS2-> S1 -> S1 -> ULT -> S2\n\nEnquanto o combo avançado:\n\nS1(nos minions) -> S2 -> S1 -> ULT -> S2 -> S1(apertar 2x) -> S2 -> S1(apertar 2x)');
          agent.add('Inicie as lutas no modo assassino para dar engage rapidamente no mago e no atirador e causar muito dano com seus combos, e poder tankar os outros no modo guerreiro'); 
          agent.add('E por favor, não testa herói novo em ranked!');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Tenho essas:');
                agent.add(new Image(YENA_1_URL)); 
                agent.add(new Image(YENA_2_URL)); 
                agent.add('A primeira é mais comum, a segunda é pra quando seu time ta carente de tank');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Yena é melhor se utilizada na Solo Lane!');
          }
        }
        break;

      case 'Yorn':

        agent.add('Hm, então quer dizer que resolveu jogar de Yorn...');
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
            agent.add('Essa bota é apenas uma sugestão');
            agent.add('Pois cada bota, assim como cada item é situacional');
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
        agent.add('Não existe bota certa, o certo é ter pelo menos uma');
        agent.add('Você é livre para completar com a que mais gostar ');
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
    const informacao  = agent.parameters.informacao;
    const tipoDano = agent.parameters.tiposDeBuild;

    let filtro = { hero:heroi, classe:classes, iniciante:begginer, tipo:tipoDano, explicar:sobre, info:informacao }; 

    if(arcanas && !filtro.info && !filtro.explicar && !filtro.hero && !filtro.classe && !filtro.iniciante && !filtro.tipo){
      agent.add('Entendi que você quer falar de arcanas, mas o que exatamente? Se quiser listar meus comandos, basta digitar: ´arcanas informações´');
    }

    if(arcanas && filtro.info){
      agent.add('Para entender melhor sobre arcanas digite:\n\n´arcanas explicar´\n\nLeitura longa');
      agent.add('Para arcanas mais indicadas para iniciantes:\n\n´arcanas para iniciantes´');
      agent.add('Se quiser arcanas “genéricas” para classes de heróis como atirador, assassino, guerreiro, suporte, tanque ou mago, digite:\n\n´arcanas [classe]´');
      agent.add('Se quiser saber as arcanas recomendadas para um herói:\n\n´arcanas [herói]´');
    }

    if(arcanas && filtro.explicar){
      agent.add('O texto é meio longo');
      agent.add('Mas vale a pena ler');
      agent.add('Minha recomendação é');
      agent.add('Esperar eu concluir');
      agent.add('E depois subir');
      agent.add('E ler com calma');
      agent.add('As arcanas são atributos extras que você equipa ao seu herói antes da partida começar\n\nEsses atributos extra vão te dar vantagens sobre seus inimigos, pois seu poder fica maior já no inicio na partida');
      agent.add('Existem três tipos de arcanas:\n\nVermelha, Roxa e Verde\n\nE cada cor é divida em 3 níveis. O mais indicado é ter páginas com arcanas de nível 3, que é o mais alto e oferece melhores atributos');
      agent.add('Todas as minhas recomendações de arcanas vão ser para esse nível\n\nLembrando que por causa do preço elevado o ideal mesmo é começar investindo seu gold nessas arcanas');
      agent.add('Elas podem não fazer muita diferença no início, mas se deseja evoluir na ranked você vai precisar ter pelo menos duas páginas de arcanas no nível 3');
      agent.add('Caso você seja iniciante e não sabe com que classe quer jogar, você pode digitar:\n\n´melhores arcanas para iniciante´\n\nQue te indico a combinação que funciona muito bem em qualquer herói');
      agent.add('Mas caso já saiba basta me pedir de forma específica, por exemplo:\n\n´melhores arcanas para mago´\n\nLembrando que as classes são: Atirador, Assassino, Guerreiro, Suporte, Tanque e Mago');
      agent.add('Ahh, lembrando, é apenas a minha sugestão, principalmente para quem é novo no jogo.\n\nA medida que você entende e tem gold suficiente para comprar mais páginas e arcanas, você pode montar conforme desejar');
      agent.add('Agora, se você já entende e quer arcanas específicas para um determinado herói, basta solicitar:\n\n´arcanas [herói]´\n\nE eu te falo as mais indicadas de acordo com a opinião de pro players');
      agent.add('Mas e ai');
      agent.add('Quer alguma dica de arcanas?');
      agent.add('Se sim');
      agent.add('É só solicitar conforme expliquei! 😉');
    }

    if (filtro.iniciante) {
      agent.add('As melhores arcanas para iniciante são arcanas para tanks e suportes, e é uma boa alternativa caso você não saiba com que classe de herói você mais gosta de jogar');
      agent.add('Basicamente elas funcionam muito bem com todos os heróis, pois garantem atributos importantes de sustain para o seu herói');
      agent.add('As arcanas são:\n\nVermelhas: Indomável\nRoxas: Benevolência\nVerdes: Coragem');
      agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
      agent.add('+10% de Velocidade de Ataque\n+1162 de HP máximo\n+23 de Armadura\n+Regeneração de 52 HP a cada 5 segundos\n+4% de Velocidade de movimento\n+6% de redução de recarga de habilidade');
    }

    if (filtro.classe && !filtro.tipo) {
      switch(filtro.classe){
        case 'Mago':
          filtro.tipo = 'AP';
          break;
        case 'Atirador':
          filtro.tipo = 'ADC';
          break;
        case 'Assassino':
          filtro.tipo = 'ADA';
          break;
        case 'Guerreiro':
          filtro.tipo = 'AD';
          break;
        case 'Tanque':
          filtro.tipo = 'Tank';
          break;
        case 'Suporte':
          filtro.tipo = 'Tank';
          break;
      }
    }

    if(filtro.tipo && !filtro.hero){
      switch(filtro.tipo) {
        case 'AD':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Indomável\nRoxas: Guerrilha/Tirania\nVerdes: Ferrão');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+637 de HP\n+23 de Armadura\n+2.5% de chance de crítico\n+15% de Velocidade de ataque\n+5% de Velocidade de movimento\n+9 de Dano físico\n+64 de Perfuração de armadura');
          break;
        case 'ADC':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Atrocidade\nRoxas: Guerrilha\nVerdes: Ferrão');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+16% de chance de crítico\n+10% de Velocidade de ataque\n+10% de Velocidade de movimento\n+9 de Dano físico\n+64 de Perfuração de armadura');
          break;
        case 'ADA':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Massacre\nRoxas: Assassino\nVerdes: Ferrão');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+45 de Dano físico\n+100 de Perfuração de armadura\n+10% de Velocidade de movimento');
          break;
        case 'AP':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Violação\nRoxas: Benevolência\nVerdes: Agitação');
          agent.add('Servem para quase todos (80%) os magos do jogo praticamente e são as mais recomendadas entre os Pro Players!');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+42 de Dano mágico\n+88 de Perfuração mágica\n+450 de HP máximo\n+Regeneração de 52 HP a cada 5 segundos\n+4% de Velocidade de movimento\n+6% de Velocidade de ataque');
          break;
        case 'Tank':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Indomável\nRoxas: Benevolência\nVerdes: Coragem');
          agent.add('É a melhor opção para os suportes e tanks do jogo');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+10% de Velocidade de Ataque\n+1162 de HP máximo\n+23 de Armadura\n+Regeneração de 52 HP a cada 5 segundos\n+4% de Velocidade de movimento\n+6% de redução de recarga de habilidade');
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

          agent.add('As arcanas recomendadas para jogar de Capheny são:'); 
          agent.add('Vermelhas: Descontrole x10');
          agent.add('Roxas: Guerrilha x7 / Ladrão x3');
          agent.add('Verdes: Ferrão x10');  
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

          agent.add('As arcanas recomendadas para jogar de Errol são:');
          agent.add('Vermelhas: Massacre x8 / Atrocidade x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Ferrão x10');
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

        case 'Yena':

          agent.add('As arcanas recomendadas para jogar de Yena são:');
          agent.add('Vermelhas: Atrocidade x1 / Indomável x9');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Ferrão x10');
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
//                                                                                 DICAS                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checarDicas(agent) {

  const dicas    = agent.parameters.Dicas;
  const heroi    = agent.parameters.herois;
  const classes  = agent.parameters.classes;
  const begginer = agent.parameters.levelPlayer;
  const role     = agent.parameters.roles;
  const itens    = agent.parameters.itens;
  const informacao = agent.parameters.informacao;

  let filtro = { hero:heroi, classe:classes, iniciante:begginer, papel:role, item:itens, dica:dicas, info:informacao}; 
  
  if(dicas == "dicas" && !filtro.info && !filtro.papel && !filtro.hero && !filtro.classe && !filtro.iniciante && !filtro.tipo){
    agent.add('Entendi que você quer dicas, mas sobre o que? Se quiser listar meus comandos, basta digitar: ´dicas informações´');
  }

  if(dicas == "combo" && !filtro.hero){
    agent.add('Entendi que você ta precisando aprender algum combo, mas não sei qual herói, para combos digite: ´combos [herói]´');
  }

  if(dicas == "dicas" && filtro.info && !filtro.hero && !filtro.classe && !filtro.iniciante && !filtro.item && !filtro.papel){
    agent.add('Se quiser dicas para iniciantes digite:\n\n´dicas para iniciantes´');
    agent.add('Se quiser dicas básicas por classes de heróis como atirador, assassino, guerreiro, suporte, tanque ou mago, digite:\n\n´dicas [classe]´');
    agent.add('Para dicas em determinada lane do jogo como mid, suporte, lane, jungle ou solo:\n\n´dicas [lane]´');
    agent.add('Para dicas sobre algum herói:\n\n´dicas [herói]´');
    agent.add('Algumas dicas possuem texto longo, portanto aguarde o bot terminar de responder para facilitar leitura');
  }

  if(filtro.item){
    if(!filtro.papel){
        agent.add('Dicas de itens são separadas por lane');
        agent.add('Como mid, suporte, lane, jungle ou solo');
        agent.add('Para isso é só digitar: dicas itens [lane]');
    }
    else{
        switch(filtro.papel){
            case 'Suporte':
              agent.add('Os itens de suporte são 4:');
              agent.add('Essência do Vento');
              agent.add(new Image(ESSENCIAVENTO_SUP));
              agent.add('Usada principalmente para proteger aliados de dano explosivo, mas também te ajuda em roaming e possiveis baits.');
              agent.add('Após ativo, o aliado com menor HP ganha (800 + level do heroi x 80) um escudo e +30% de velocidade de movimento por 3 segundos');
              agent.add('Anel do Amigo');
              agent.add(new Image(ANELAMIGO_SUP));
              agent.add('Melhor item contra inimigos que ficam invisível');
              agent.add('Após ativo, revela inimigos próximos por 4 segundos e os aliados próximos ganham +50% de velocidade de movimento por 2 segundos');
              agent.add('Marca do Poseidon');
              agent.add(new Image(MARCAPOSEIDON_SUP));
              agent.add('Melhor item contra inimigos que possuem muito poke e danos constantes');
              agent.add('Não pode ser ativado, mas garante regeneração de HP e mana por segundo a você e todos os aliados próximos');
              agent.add('Braçadeiras Purificadas');
              agent.add(new Image(BRACADEIRA_SUP));
              agent.add('Melhor item contra inimigos que possuem muito controle de grupo');
              agent.add('Após ativo, remove todos os efeitos de controle de grupo de todos os aliados próximos');
              break;
            case 'Jungle':
              agent.add('No momento não tenho dicas para esses itens');
              break;
            case 'Mid':
              agent.add('No momento não tenho dicas para esses itens');
              break;
            case 'Lane':
              agent.add('No momento não tenho dicas para esses itens');
              break;
            case 'Solo':
              agent.add('No momento não tenho dicas para esses itens');
              break;
        }
    }
  }

  if (filtro.iniciante && !filtro.classe && !filtro.item && !filtro.papel && !filtro.hero) {
    agent.add('Então você começou a jogar agora e ta precisando de ajuda né?');
    agent.add('Sem problemas ;)');
    agent.add('O texto é meio longo');
    agent.add('Mas vale a pena ler');
    agent.add('Recomendo esperar eu concluir tudo');
    agent.add('E depois subir e ler com calma');
    agent.add('As dicas que eu tenho para você são essas:');
    agent.add('1. Guarde todo seu gold inicial para comprar arcanas!\n\nSão elas que fazem seu herói ficar mais forte que o dos outros');
    agent.add('2. Consiga novos heróis de missões e eventos!\n\nO ideal é jogar com esses heróis e descobrir a função que você mais se identifica');
    agent.add('3. Olhe sempre o mapa, ele é seu melhor amigo durante uma partida!\n\nÉ olhando para o mapa que você identifica rotações do time inimigo e evita tomar ganks');
    agent.add('4. Limpe as waves de minions!\n\nElas te ajudam a levar objetivos e te dão maior visão do mapa');
    agent.add('5. Assistir gameplays vai melhorar seu desempenho!');
    agent.add('6. NÃO seja tóxico ou negativo com seu time!');
    agent.add('7. NÃO teste herói em ranked!\n\nÉ pra isso que existe o modo vs bot e normal');
    agent.add('8. NÃO roube os monstros da jungle do seu time e SIM do time inimigo!\n\nCaso você faça isso vai estar atrapalhando o seu time, principalmente seu jungler');
    agent.add('9. NÃO fique somente matando ou farmando, DERRUBE torres!\n\nEm outras palavras, converta kills em objetivos e torres! \n\nAh e não existe essa de "sua" lane, existem "nossas" lanes, pois quando uma torre do seu time cai, todo o time perde, independente da lane');
    agent.add('10. Preste atenção na estrutura e composição do time!\n\nMás escolhas de classe podem levar a derrota antes da partida começar\n\nGeralmente temos:'); 
    agent.add('Magos no mid, atiradores e suportes na lane do dragão, assassinos na jungle, guerreiros na lane do demônio');
    agent.add('Lembrando que o mapa é espelhado, a lane do dragão ou do demônio pode ser no top ou no bot e a melhor forma de identificar isso é olhando para o mini mapa'); 
    agent.add('Segue imagem:');
    agent.add(new Image(minimap_lane));
    agent.add('Só os monstros da jungle que são fixos');
    agent.add('11. Não existe build certa, existe build mais recomendada!\n\nVocê deve fazer seus itens de acordo com seus inimigos, pois cada partida é única. As builds que recomendo são apenas uma base, você pode sempre mudar');
    agent.add('E por enquanto isso é tudo');
    agent.add('Ah, lembrei'); 
    agent.add('A última e mais IMPORTANTE dica:');
    agent.add('O Arena Of Valor, assim como todo MOBA, é um jogo de estratégia e ganha o time que derrubar primeiro o núcleo.\n\nÉ como se fosse um tower defense mais dinâmico, onde saber o momento certo de avançar ou recuar é o que faz a diferença numa partida, logo derrubar torres é mais importante que kills.\n\nVocê não precisa de muita mecânica ou de heróis extremamente fortes, você só precisa de atenção, principalmente no mapa e na classe que você estiver jogando');
    agent.add('Ah e qualquer dúvida sobre builds ou arcanas é só falar comigo! ;)');
  }
  
  if(filtro.classe && !filtro.iniciante && !filtro.papel){
    if(filtro.classe == 'Suporte'){
        filtro.papel = 'Suporte';
    }else{
        filtro.iniciante = 'Iniciante';
    }
  }

  if (filtro.classe && filtro.iniciante && !filtro.item && !filtro.hero) {
    switch(filtro.classe){
      case 'Mago':
        agent.add('Hm, magos, tão frágeis mas tão fortes');
        agent.add('Existem magos Burst, responsáveis por causar dano mágico explosivo e magos de controle, que causam muito stuns e atordoam o time inimigo');
        agent.add('Ambos foram feitos para participar das batalhas, pois sua principal função é causar dano aos heróis inimigos');
        agent.add('Então, ao jogar com mago esteja sempre rotacionando para ajudar seu time, pois eles precisam muito de você');
        break;
      case 'Atirador':
        agent.add('Hm, atiradores, tão frágeis mas tão fortes');
        agent.add('Foram feitos para ser a maior fonte de dano físico, por isso são os responsáveis por focar em objetivos');
        agent.add('Posicionamento é tudo, então estejam sempre em alerta e nunca fique sozinho pois é a classe mais focada por assassinos e magos');
        agent.add('Além disso use o limite da distancia de ataque (range) ao seu favor, nunca deixe seus inimigos chegarem próximo de você');
        agent.add('Nunca fique batendo parado nem pule no meio de uma batalha, sempre que atacar alguém vá se movimentando, mantendo a distancia limite do seu alcance');
        agent.add('Devido a essa característica eles são os heróis que conseguem derrubar torres com maior facilidade, portanto, foca as torres!');
        break;
      case 'Assassino':
        agent.add('Hm, assassinos, sempre com sede de sangue');
        agent.add('Geralmente são heróis que causam dano explosivo (burst)');
        agent.add('São responsáveis por assegurar todos os objetivos e farmar tudo: monstros, heróis e torres');
        agent.add('Seu foco é fazer seus inimigos sentirem medo de andar sozinhos por ai');
        agent.add('E fica ligado de entrar no momento certo da luta, pois seu papel é finalizar os inimigos');
        break;
      case 'Guerreiro':
        agent.add('Hm, guerreiros, sempre surpreendendo o jungle inimigo');
        agent.add('Eles são parecidos com tanques, porém possuem mais dano e menos defesa que um');
        agent.add('Geralmente são heróis que fazem split push, e são bons contra assassinos');
        agent.add('Evite fazer builds full dano/tank em guerreiros, seu forte é justamente ter esse mix de ataque e defesa');
        break;
      case 'Tanque':
        agent.add('Hm, tanques, sempre carregando seu time nas costas');
        agent.add('São os principais quando o assunto é proteger aliados');
        agent.add('Responsáveis por iniciar as batalhas e fundamentais no momento de avançar ou recuar');
        agent.add('Tente ao máximo sobreviver e saiba que seu papel é tomar dano no lugar do seu ADC então sempre acompanhe seu time');
        break;
      case 'Suporte':
        agent.add('Hm, suportes, sempre carregando seu time nas costas');
        agent.add('Seu foco enquanto suporte é ter controle de grupo, incomodando o time inimigo e sempre ao lado de um herói que causa dano');
        agent.add('Tente ao máximo rotacionar dando visão para garantir segurança do seu time assim como controle de mapa');
        break;
    }
  }

  if(filtro.papel && !filtro.hero && !filtro.item){
    switch(filtro.papel) {
      case 'Lane':
        agent.add('Ao jogar na Lane sua função é farmar ao máximo e principalmente derrotar o dragão que é o primeiro objetivo do jogo aos 2min');
        agent.add('É nessa lane que os minions vão dar mais experiência e gold');
        agent.add('Portanto evite morrer ao máximo, e esteja sempre de olho em possíveis ganks do jungler ou do mid inimigo');
        agent.add('Seu papel é limpar waves de minions e puxar lane o máximo possível!');
        break;
      case 'Solo':
        agent.add('Jogar na solo lane, conhecida também como lane do demônio, é a função mais fácil entre as demais.');
        agent.add('Você só precisa manter seu olho no jungle e no mid inimigo durante o early game, se perceber que algum está indo para sua lane, limpe sua wave rapidamente e volte para debaixo de sua torre');
        agent.add('Passando early game seu foco depende do seu herói, caso seja um tank, seu foco é ajudar seu time, portanto fique atento a tfs rolando pelo mapa só não esqueça da sua lane');
        agent.add('Sendo um split pusher, tente fazer pressão no mapa, observe no mapa rotações do time adversário para puxar uma lane, não espere que seu time te ajude, seu papel é chamar atenção contrária as batalhas que seu time faz');
        break;
      case 'Suporte':
        agent.add('Apesar de ser a função mais subestimada, um suporte tem o trabalho mais importante durante todo o jogo');
        agent.add('No inicio do jogo ganhe visão para o seu time, faça pressão no mid, na jungle e acompanhe sempre as rotações que seu jungle faz\n\nSuportes foram feitos para estar ao lado de outro herói que cause dano, ou seja, nada de split push ou abandonar seu time');
        agent.add('E pode até não parecer, mas um bom suporte afeta muito o jogo Seu time vai ter controle de mapa, não vai tomar ganks surpresas e vai completar objetivos muito mais rápido');
        agent.add('Além disso você precisa entender os itens de suporte: ');
        agent.add('Itens do vento são para suportes que fazem roaming, enquanto itens da água foram feitos caso você fique duo lane com outro herói');
        agent.add('Para entender melhor cada um, você pode digitar: ´dicas itens suporte´');
        break;
      case 'Mid':
        agent.add('Mid é o lugar mais importante no mapa, especialmente no early game. Uma vez que você perde sua primeira torre do mid por exemplo, você perde bastante controle de mapa e consequentemente perde objetivos');
        agent.add('Por isso tome bastante cuidado nas rotações do começo do jogo, ganks no mid são bem comuns');
        agent.add('Sua função ao jogar nessa lane é poder causar pressão em todo o mapa, limpando rapidamente sua wave e saindo para ajudar as outras lanes');
        agent.add('O ideal é sempre fazer essas rotações acompanhando seu jungler e seu suporte, o controle e poder de dano na batalhe é muito maior');
        agent.add('Lembrando que seu foco, como mago nessa lane é participar de todas as batalhas, pois limpando a wave seus próprios minions são capazes de derrubar a torre');
        break;
      case 'Jungle':
        agent.add('Jogar na jungle é a função mais difícil e complexa do jogo, pois você precisa ter total consciência de mapa');
        agent.add('Um bom jungler consegue prever rotações, assim como consegue se mover pelo mapa de forma imprevisível, surpreendendo sempre o time inimigo');
        agent.add('E infelizmente existe um mal entendido de que o jungler precisa iniciar os ganks, e a menos que o seu herói tenha uma boa habilidade de iniciação, isso é um mito');
        agent.add('Um jungler é um herói especialista em finalizações, seu papel é matar os heróis mais frágeis. Não espere que um nakroth ganhe uma luta pulando em cima de um Xeniel full hp.');
        agent.add('O ideal é que o mago e o suporte acompanhe o jungle nesses ganks, pois dessa forma você não vai pular numa tf em desvantagem');
        agent.add('Sobre itens da jungle, minha recomendação é essa:');
        agent.add(new Image(itens_jungle));
        agent.add('Você deve sempre seguir essa ordem de compra, pois é isso que garante um gank mais forte no lvl 4');
        agent.add('Completando primeiro o item da jungle tier 2 seu talento punir vai poder ser usado em heróis inimigos e você já vai estar com a passiva do item ativo');
        agent.add('Sobre rotações, essa é a mais básica:');
        agent.add(new Image(rotacao_jungle));
        agent.add('Você deve iniciar pelo lado do demônio para conseguir gankar a lane do dragão aos 1:50 aproximadamente');
        agent.add('E aos 2min de game completar o primeiro objetivo do jogo que é o Dragão');
        agent.add('Sempre convertendo kills em objetivos!');
        break;  
    }
  }

  if(filtro.hero) {
    switch(filtro.hero){

      case 'Airi':

        if(filtro.dica == "combo"){
          agent.add('Combo básico:\n\nS1 -> S2 -> AA -> ULT -> AA -> AA -> S1\n\nO ideal é usar sua shuriken antes de iniciar, pois seu cooldown reduz 1 segundo a cada AA, podendo ser usada mais de uma vez no mesmo combo');
        }else{
          agent.add('A Airi é uma guerreira/assassina, com um split push forte devido sua alta mobilidade, capaz de causar dano explosivo e controle de grupo');
          agent.add('Sua primeira habilidade é seu poke, maximize-a primeiro e aprenda a usar com maestria, o quanto você acerta a shuriken determina quão bom você é com ela');
          agent.add('Sempre jogue de forma agressiva e aproveite para pular em cima de atiradores (sua maior prioridade) e outros heróis mais papeis\n\nMas tome cuidado para não ficar sem sua segunda habilidade, quando elas estão em cooldown a Airi fica muito vulnerável, então, nunca gaste ela totalmente para iniciar');
          agent.add('Nunca fique usando sua shuriken por trás dos tanks do seu time para depois tentar atravessar a frontline do time inimigo para ultar\n\nUsar a mobilidade da Airi para contornar da tf e surpreender a backline inimiga é o gank correto, pois assim eles não tem tempo de reagir ou se reposicionar');
          agent.add('Um combo que indico com ela é:\n\nS1 -> S2 -> AA -> ULT -> AA -> AA -> S1\n\nO ideal é usar sua shuriken antes de iniciar, pois seu cooldown reduz 1 segundo a cada AA, podendo ser usada mais de uma vez no mesmo combo');
          agent.add('Lembrando que sua ULT, quanto mais inimigos tiver, maior vai ser o escudo que você ganha! Ah, e o Talento recomendado é Executar');
        }
        break; 

      case 'Aleister':
        
        if(filtro.dica == "combo"){
          agent.add('Combo básico:\n\nS1 -> S2 -> ULT\n\nSe você estiver na moita, é fácil matar qualquer um com esse combo, mas o ideal é ficar usando a primeira e a segunda durante tfs e guardar sempre a ULT para punir erros de posicionamento do time adversário');
        }else{
          agent.add('Aleister é um mago com pouca mobilidade porém possui MUITO controle de grupo, causando slow e stuns que duram tempo suficiente para ajudar seus aliados que precisam chegar mais próximo do inimigo para finalizar');
          agent.add('Sua segunda habilidade é sua maior fonte de dano e consequentemente sua melhor habilidade para limpar waves de minions, maximize-a primeiro');
          agent.add('Devido seu kit capaz de causar muito dano e controle de grupo, o ideal ao jogar com Aleister é buildar itens que aumente sua velocidade de movimento, pois é extremamente importante a sua participação nas tfs\n\nDevido a grande área que suas habilidades atinge, é fácil limpar waves e rotacionar com ele, foque nisso!');
          agent.add('O combo mais básico e eficiente dele é:\n\nS1 -> S2 -> ULT\n\nSe você estiver na moita, é fácil matar qualquer um com esse combo, mas o ideal é ficar usando a primeira e a segunda durante tfs e guardar sempre a ULT para punir erros de posicionamento do time adversário');
          agent.add('Aproveite do fato que infelizmente muitos se esquecem do dano absurdo que ele causa em quem ficar parado na sua segunda habilidade e use principalmente quando tiver inimigos debaixo da sua torre');
          agent.add('Lembrando que o Aleister tem pouco potencial de finalização e nenhum escape, portanto mantenha sempre uma boa distancia de seus inimigos com suas habilidades criando oportunidades para seu jungle finaliza-los. Ah, e o Talento recomendado é Sprint');
        }
        break;

      case 'Alice':

        if(filtro.dica == "combo"){
          agent.add('As habilidades do Alice foram feitas para proteger e incomodar os inimigos, portanto não tem um combo básico específico');
        }else{
          agent.add('Alice, uma maga/suporte com bastante controle e buffs para seus aliados, possui um dos melhores kits para iniciar ganks e roamings');
          agent.add('Maximize sua primeira habilidade, é sua maior fonte de dano');
          agent.add('Entenda uma coisa, a Alice gasta muita mana com suas habilidades, portanto saber usar no momento certo é mais útil do que usar sem parar para limpar waves');
          agent.add('Não fique usando sua primeira habilidade sempre que ver um inimigo, use-a para iniciar um gank, um stun ajuda muito um jungler a iniciar');
          agent.add('Ah e seu escudo (S2) não protege tanto sim, a não ser que você build AP, o que não é muito interessante, use como fosse só um boost na velocidade do seu time\n\nTente usar sempre que tiver certeza de que seu time tiver decidido para onde ir, para não acabar ficando fora de posicionamento, ou quando um aliado sofrer algum slow');
          agent.add('Sua ULT funciona bem com um mago de dano explosivo, pois além de causar slow e silence, aumenta o dano mágico sofrido\n\nMas você pode usar de forma defensiva protegendo seu atirador de dives do jungler inimigo');
          agent.add('A Alice é umas das melhores suportes para rotacionar junto de outro herói, não fique sozinha nunca!');	
        }
        break;

      case 'Amily':

        if(filtro.dica == "combo"){
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT -> AA\n\nCom o slow da sua primeira skill fica fácil pular em cima dos inimigos, principalmente pois além do dano você ganha regen de hp');
        }else{
          agent.add('Amily é uma guerreira/tank com habilidades que a tornam quase uma assassina, devido sua excelente mobilidade e passiva que aumenta o dano ao lutar em 1x1');
          agent.add('Maximize sua segunda habilidade, é sua maior fonte de dano');
          agent.add('Suas habilidades foram feitas para situações de x1, portanto seu foco é ganks no mid, invades na jungle inimiga e split push, sempre roaming!\n\nPense nela como um herói de sustain, não de dano explosivo');
          agent.add('Evite participar de tfs, sua passiva não funciona nessas situações e ela não é bem uma tank.\n\nMinha dica é, pular na tf após ela ter iniciado apenas para usar sua ULT, e evite ficar nela se estiver enfrentando dano explosivo, é sua maior fraqueza');
          agent.add('Falando em ULT, essa é sua razão para ser forte em split push, capaz de tankar heróis como Omen na ULT por exemplo\n\nAssim como todas suas habilidades ajudam no escape dela');
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT -> AA\n\nCom o slow da sua primeira skill fica fácil pular em cima dos inimigos, principalmente pois além do dano você ganha regen de hp');
          agent.add('Você pode usar tanto Executar, Flick ou Punir como talento, mas te indico Executar');
        }
        break;

      case 'Annette':

        if(filtro.dica == "combo"){
          agent.add('As habilidades da Annette foram feitas para proteger e incomodar os inimigos, portanto não tem um combo básico específico');
        }else{
          agent.add('Annette é uma maga/suporte com bastante controle de grupo. Todas suas habilidades causam algum tipo de controle seja slow ou stun.');
          agent.add('Priorize a sua primeira habilidade, é sua maior fonte de dano\n\nJá na segunda habilidade, você precisa mirar de forma que acerte dois inimigos alinhados, para que sejam atordoados');
          agent.add('Use sua ULT sempre que necessário para empurrar heróis melee que tentarem se aproximar de seus aliados\n\nMas tome cuidado para não ajudar seus inimigos afastando eles das habilidades em área de seus aliados');
          agent.add('Por ser uma suporte, sua função durante uma partida é Roaming, esteja sempre próximo de seus aliados ganhando visão de mapa. E devido sua composição minha dica é buildar a Annette mais tank');
          agent.add('O talento sugerido para ela é Curar');
        }
        break;

      case 'Arduin':

        if(filtro.dica == "combo"){
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> S1 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> S1 -> AA');
        }else{
          agent.add('Arduin é um guerreiro/tank, com um kit forte para iniciar tfs e controlar os inimigos, muito forte na solo lane ou até mesmo como um suporte');
          agent.add('Maximize sua segunda habilidade se estiver na solo, ou a primeira caso esteja como suporte');
          agent.add('Não tenha medo de usar sua ULT, tem um cooldown curto, use para se aproximar de seus inimigos');
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> S1 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> S1 -> AA');
          agent.add('Lembrando que você é um tank, não tente pular sozinho numa tf, você precisa ter seu time junto!');
        }
        break;
 	 	
      case 'Arthur':

        if(filtro.dica == "combo"){
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> AA');
        }else{
          agent.add('Arthur é um guerreiro/tank, capaz de aguentar e causar muito dano sem depender de mana para isso');
          agent.add('Maximize sua primeira habilidade primeiro, mas no inicio do jogo upa primeiro sua segunda habilidade pois ela é mais útil nas tfs lvl 1 e ajuda na primeira wave clear');
          agent.add('Inicie tfs usando sua primeira para colocar uma marca no inimigo e causar dano adicional, use sua segunda quando já estiver próximo dos inimigos');
          agent.add('Quando estiver com sua ULT, foque usar sempre no mago ou no atirador inimigo, o combo com a ULT é forte o suficiente para matar esses heróis sem defesa.');
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> AA');
          agent.add('Lembrando que sua passiva faz o Arthur ser um tank natural contra heróis de dano físico, porém ele é muito dependente de sua build e arcanas, saiba buildar corretamente.');
        }
        break;

      case 'Arum':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Astrid':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Azzenka':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('O Azzenka é um dos magos com o maior controle em área do jogo, capaz de causar muito dano, porém, tem uma das piores mobilidades');
          agent.add('Sua segunda habilidade é sua maior fonte de dano, é sempre bom começar upando ela');
          agent.add('Jogue com ele de forma recuada, sempre preocupado com seu posicionamento, pois você não possui nenhuma habilidade de escape');
          agent.add('O ideal é ficar dando poke de longe com a primeira e a segunda, sempre na backline\n\nE tenha cuidado com sua ULT, apesar de muito forte, se usada de forma errada pode não causar dano em ninguém já que ela explode no primeiro inimigo que atingir, podendo esse ser apenas um minion');
          agent.add('Minha dica é, usar com sabedoria sua segunda skill, se ver dois inimigos lado a lado, esse é o momento certo, ela vai rebater nos 2 o suficiente para petrifica-los');
        }
        break;

      case 'Baldum':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Batman':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Butterfly':

        if(filtro.dica == "combo"){
          agent.add('Olha, não acredito que tenha um combo específico, BF é só apertar todas as skills perto do inimigo');
        }else{
          agent.add('A Butterfly é uma assassina capaz de virar tfs ao seu favor, devido sua passiva de resetar habilidades após um abate tendo sempre sua ult disponível');
          agent.add('Já que não gasta mana, você pode usar sua primeira habilidade sempre para se movimentar mais rápido pelo mapa');
          agent.add('Ao jogar de BF, você precisa entender que um assassino é focado em finalizações, ou seja, você não deve iniciar tfs, você deve chegar para finalizar quem já ta quase morto');
          agent.add('O ideal é sempre rotacionar de forma que surpreenda, antecipando rotações e pegando justamente aquele atirador ou mago que chegou tarde para batalha, seu foco inicial são eles');
          agent.add('Saber focar o herói inimigo certo vai te ajudar a decidir qual o melhor momento de pular no meio de uma tf, e por favor, não foca o tank!');
        }
        break;       

      case 'Capheny':
        
        if(filtro.dica == "combo"){
          agent.add('Combo básico:\n\nS1 -> AA -> S2 -> AA -> S1 -> AA -> AA -> AA...');
        }else{  
          agent.add('A Capheny é uma atiradora, focada no auto attack, capaz de causar muito dano em torres com seu laser');
          agent.add('E te digo, o laser é só um detalhe, o forte dela é o auto attack.\n\nTenta sempre se movimentar enquanto atacar pra tirar o melhor dela, posicionamento com a Capheny é TUDO!');
          agent.add('O combo mais eficiente para ela é:\n\nS1 -> AA -> S2 -> AA -> S1 -> AA -> AA -> AA...');
          agent.add('Lembrando que a passiva dela é a cada 1% de velocidade de ataque = 2 de dano e o limite máximo de velocidade de ataque é 200%');
        }          
        break;

      case 'Chaugnar':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Cresht':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        } 
        break;

      case 'Darcy':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;  

      case 'Diaochan':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        } 
        break; 

      case 'Elsu':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;  

      case 'Errol':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Fennik':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Florentino':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Gildur':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Grakk':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Hayate':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ignis':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ilumia':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Jinnar':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Kahlii':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;  

      case 'KilGroth':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Kriknak':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Krixi':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Lauriel':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Liliana':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Lindis':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'LuBu':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Lumburr':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Maloch':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Marja':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Max':

        if(filtro.dica == "combo"){
          agent.add('As habilidades do Max foram feitas para situações específicas, portanto não existe um combo específico para ele\n\nMinha dica é, não use sua ult para tentar matar aquele inimigo que escapou com pouco hp, use nas tfs para afastar ou retirar atiradores e assassinos da batalha');  
        }else{
          agent.add('O Max é um guerreiro muito forte capaz de mudar o resultado de tfs se souber usar sua ult global no momento certo');
          agent.add('Tenha em mente duas coisas: O Max não é um tank e seu foco é ultar no atirador ou no assassino inimigo, retirando/afastando eles das tfs');
          agent.add('Ao jogar de Max, é importante que você tenha uma boa noção de mapa, pois sua ult apesar de ter longo tempo de recarga ajuda a informar o posicionamento do time inimigo');
          agent.add('O ideal é evitar de usar sua ult a longa distancia, pois dependendo da distância, o inimigo pode voltar base antes de você chegar ou o time inimigo pode estar só esperando você chegar para te atacar');
          agent.add('Use sua segunda skill para cancelar habilidades dos inimigos, não use somente para causar dano.\n\nE lembre-se, nem sempre vale a pena usar sua ult para tentar matar aquele inimigo que fugiu com pouco hp, a prioridade é usar sua ult para ajudar nas tfs que já estão rolando');
        }
        break;

      case 'Mganga':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Mina':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Moren':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Murad':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Nakroth':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Natalya':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Omega':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ormarr':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Omen':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Peura':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Preyta':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Quillen':

        if(filtro.dica == "combo"){
          agent.add('Combo básico com o Quillen é:\n\nULT -> S2 -> S1 -> AA -> ULT -> S2 -> S1 -> AA -> ULT...\n\nO Quillen é um assassino feito para situações 1x1, portanto seu foco é sempre atacar heróis que estiverem mal posicionados, fora das tfs, focando sempre no mago e no atirador!');  
        }else{
          agent.add('O Quillen é um dos assassinos mais rápidos do jogo, devido sua passiva de resetar habilidades após um abate tendo sempre sua ULT disponível');
          agent.add('A primeira skill é a maior fonte de dano dele, portanto maximize primeiro essa habilidade');
          agent.add('Ao jogar de Quillen você precisa entender o tempo de invisibilidade de sua ULT,\n\nAo usar ela antes de pular no meio de uma tf, ou você finaliza o inimigo para ter a habilidade disponível novamente e continuar o combo ou você vai morrer');
          agent.add('Por causa da sua ULT, geralmente seus inimigos vão buildar anel do amigo, uma dica é fingir que vai pular na tf e sair\n\nApenas para forçar o inimigo a usar anel do amigo e ficar sem no momento em que você de fato pula pra cima');
          agent.add('O ideal é sempre rotacionar de forma que surpreenda, use sua ULT para antecipar rotações e pegar justamente aquele atirador ou mago que chegou tarde para batalha');
          agent.add('O combo básico do Quillen é:\n\nULT -> S2 -> S1 -> AA -> ULT -> S2 -> S1 -> AA -> ULT...\n\nE esse ciclo continua até você matar todos os inimigos, seu foco é sempre situações de 1x1, nunca pule no meio de uma tf');
          agent.add('Lembrando de atacar sempre nas costas dos inimigos, isso serve inclusive para os monstros da jungle, quanto mais dano você causa, mais rápido limpa a jungle e fica disponível para ajudar seus aliados');
        }
        break;

      case 'Raz':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Riktor':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Rourke':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Roxie':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ryoma':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Sephera':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Skud':

        if(filtro.dica == "combo"){
          agent.add('Combo básico com o Skud é:\n\nS2 -> Aguarda a contagem de 5 segundos -> S1 -> AA -> ULT -> S1\n\nO Skud foi feito para causar dano explosivo e bater em retirada, acerte seu soco carregado e use a ULT para resetar a primeira skill e conseguir fugir');  
        }else{
          agent.add('O Skud é também conhecido como one punch man devido ao seu soco carregado, capaz de apagar facilmente heróis com pouca armadura');
          agent.add('A segunda skill é a maior fonte de dano dele, portanto maximize primeiro essa habilidade');
          agent.add('Você deve ter noção da contagem de 5 segundos após ativar a habilidade para conseguir acertar o soco na hora certa');
          agent.add('O ideal é usar o dash da primeira habilidade para chegar o mais perto possível do seu alvo e acertar o soco na carga máxima');
          agent.add('Ao usar a ULT e acertar algum herói inimigo, sua primeira habilidade é resetada, podendo ser usada novamente tanto para escapar ou finalizar outro inimigo');
          agent.add('Devido ao seu kit, o Skud é ideal para split pushs e rotações rapidas de ganks no mid, pois basta um soco para deitar magos, e principalmente, torres');
          agent.add('Muito cuidado com controles de grupo, um stun é capaz de cancelar seu ataque explosivo. Vale a pena nesse caso usar a bota escolha de hermes, pois te garante mais velocidade nas rotações e ganks');
        }
        break;
  

      case 'Slimz':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Superman':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Taara':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'TeeMee':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'TelAnnas':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;


      case 'Thane':

        if(filtro.dica == "combo"){
          agent.add('As habilidades do Thane foram feitas para proteger e incomodar os inimigos, portanto não tem um combo básico específico');  
        }else{
          agent.add('Thane é um tanque/suporte com muito controle de grupo, capaz de aguentar muito dano e causar bastante estrago com sua ULT');
          agent.add('Nunca inicie uma tf usando de cara todas as suas habilidades, sua função é estar próximo das tfs de olho nos possíveis ganks do jungle ao seu adc/mago');
          agent.add('Use suas habilidades nesses momentos, sempre focado em proteger seu atirador ou mago, seja empurrando os inimigos ou atordoando');
          agent.add('Sua ULT causa dano real, ou seja, ignora armadura e atinge em cheio na vida do inimigo, use com cuidado para não roubar kills, mas caso aconteça, é a vida');
          agent.add('O importante é ajudar a matar, enquanto seu foco principal é proteger!');
        }
        break;

      case 'TheFlash':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;


      case 'TheJoker':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Toro':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Tulen':

        if(filtro.dica == "combo"){
          agent.add('Combo básico com Tulen é:\n\nS1 -> S2 -> AA -> ULT\n\nAcertando a primeira e a segunda skill corretamente, sua passiva já vai estar ativa, só restando a ULT para finalizar o inimigo');  
        }else{
          agent.add('Tulen é um mago de alta mobilidade, com bastante dano explosivo e grande poder de finalização de seus inimigos com sua ULT');
          agent.add('Comece o jogo upando sua segunda skill, pois isso te ajuda em possíveis ganks no early game e maximize a primeira skill, é sua maior fonte de dano além da passiva');
          agent.add('Apesar de acertar a longa distancia, as skills do Tulen foram feitas para ser usadas o mais próximo possível do inimigo');
          agent.add('Acertando corretamente os 3 raios da primeira skill e acertando a segunda skill no momento da partida e da chegada, você garante os 5 stacks necessários para ativar a passiva');
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT\n\nMinha dica é, utilize a primeira skill nos minions, é mais fácil de acertar os 3 raios para pelo menos acumular stack antes da tf, mas não entre nela sem stacks da segunda habilidade.');
          agent.add('Lembrando que é importante que sua ULT mate o alvo, pois além de ativar a passiva novamente seu cooldown é reduzido podendo ser usada novamente em poucos segundos em outro inimigo');
        }
        break;

      case 'Valhein':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Veera':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Veres':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Violet':

        if(filtro.dica == "combo"){
          agent.add('Combo básico com a Violet é:\n\nS1 -> AA -> ULT\n\nA Violet foi feita para dar poke nos inimigos com sua bazooka, mantendo sempre a distância para aproveitar o range de sua habilidade');  
        }else{
          agent.add('Violet é a atiradora com o maior range do jogo, capaz de matar com um tiro só no late game');
          agent.add('A primeira skill é a maior fonte de dano dela, portanto maximize primeiro essa habilidade');
          agent.add('Você deve aproveitar o longo range da bazooka sempre usando o limite do alcance da sua skill para acertar os inimigos de longe sem ter chance de você sofrer algum dano');
          agent.add('O ideal é sempre rolar para trás, nunca para perto do inimigo, pois assim você garante que não vai sofrer nenhum dano');
          agent.add('Caso esteja com dificuldades de acertar a ULT, você pode usar a segunda skill dela antes para causar slow nos inimigos');
          agent.add('Ou fazer capa de gelo no lugar da omniarma e causar slow a longa distancia usando sua primeira skill, é uma boa quando estiver enfrentando heróis com muita mobilidade');
        }
        break;

      case 'Wiro':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Wisp':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Wonder Woman':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Wukong':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Xeniel':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'YBneth':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Yena':

        if(filtro.dica == "combo"){
          agent.add('Combo básico com a Yena é:\n\nS2a-> S1a -> S1a -> ULT -> S2b\n\nCombo avançado:\n\nS1a(nos minions) -> S2a -> S1a -> ULT -> S2b -> S1b(apertar 2x) -> S2b -> S1b(apertar 2x)\n\nLegenda - a: modo assassino\nb: modo guerreiro');
        }else{
          agent.add('Minha dica para jogar com ela é entender bem os dois modos de combate que ela tem');
          agent.add('O primeiro modo é o modo assassino, nele sua velocidade de movimento é aumentada\n\nEnquanto o segundo é seu modo guerreiro, sua velocidade de ataque diminui mas aumenta o dano em 50%\n\nPara trocar de modo você deve usar sua ULT');
          agent.add('Lembrando que a cada golpe (ataque básico ou habilidade) que ela dá no inimigo no modo assassino acumula um stack, ao somar 5 stacks, o inimigo toma silence e reduz o movimento em 80%!');
          agent.add('Sua primeira skill no modo assassino pode ser usada duas vezes se acertar um minion ou herói na primeira vez\n\nE no modo guerreiro é possível mudar a direção enquanto carrega a habilidade usando flick ou pode ser usada imediatamente apertando duas vezes');
          agent.add('Enquanto usa sua segunda habilidade no modo guerreiro, você fica imune a controle, portanto saiba combar bem com isso\n\nAlém disso, sua segunda skill no modo assassino arremessa uma shuriken que ao ser coletada reduz o cooldown da mesma em 5 segundos, seu combo geralmente começa aqui');
          agent.add('O combo mais comum é:\n\nS2a-> S1a -> S1a -> ULT -> S2b\n\nCombo avançado:\n\nS1a(nos minions) -> S2a -> S1a -> ULT -> S2b -> S1b(apertar 2x) -> S2b -> S1b(apertar 2x)\n\nLegenda - a: modo assassino\nb: modo guerreiro');
          agent.add('Inicie as lutas no modo assassino para dar engage rapidamente no mago e no atirador e causar muito dano com seus combos, e poder tankar os outros no modo guerreiro'); 
        }
        break;
        
      case 'Yorn':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zanis':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zephys':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zill':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zuka':

        if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }else{
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;
    } 
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                               intentMap                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  let intentMap = new Map();

  intentMap.set('checarBuild', testando); 

  intentMap.set('checarDicas', checarDicas);

  intentMap.set('checarBuild', checarBuild);
  
  intentMap.set('checarBoots', checarBoots);
  
  intentMap.set('glossarioExplicar', glossarioExplicar);

  intentMap.set('listarAlgo', listarAlgo);

  intentMap.set('detalharItens', detalharItens);

  intentMap.set('checarArcanas', checarArcanas);

  intentMap.set('ultimasAtualizacoes', ultimasAtualizacoes);

  intentMap.set('listar_menu', listar_menu);
  
  agent.handleRequest(intentMap);

});
