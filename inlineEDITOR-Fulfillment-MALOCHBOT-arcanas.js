// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs

// for Dialogflow fulfillment library docs, samples, and to report issues

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://malochbot-f9f23.firebaseio.com/'
});

const {WebhookClient, Image, Suggestion, Card} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

const CHECARBUILD_INTENT = 'checarBuild';
const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';

////////////////////////////////////////////////////////////////////
//                   URL de todas as builds                       //
////////////////////////////////////////////////////////////////////

const AIRI_LANE_URL           = 'https://imgur.com/hzeoeLf.jpg';
const AIRI_JG_URL             = 'https://imgur.com/yF7Hta3.jpg';
const ALEISTER_URL            = 'https://imgur.com/pupCJgu.jpg';
const ALICE_URL               = 'https://imgur.com/ukMO37b.jpg';
const AMILY_URL               = 'https://imgur.com/K7bGZeg.jpg';
const AMILY_2_URL             = 'https://imgur.com/0HrQnNr.jpg';
const AMILY_JG_URL            = 'https://imgur.com/8f6LPRf.jpg';
const ANNETE_URL              = 'https://imgur.com/9D6r0BM.jpg';
const ANNETE_2_URL            = 'https://imgur.com/Rrde3p5.jpg';
const ANNETE_3_URL            = 'https://imgur.com/a1qj9Aa.jpg';
const ARDUIN_URL              = 'https://imgur.com/lZmyaWB.jpg';
const ARDUIN_2_URL            = 'https://imgur.com/xjvn5eh.jpg';
const ARDUIN_SUP_URL          = 'https://imgur.com/tb7LekD.jpg';
const ARTHUR_URL              = 'https://imgur.com/Lt4u18a.jpg';
const ARUM_SOLO_URL           = 'https://imgur.com/kq45FMV.jpg';
const ARUM_SUPORTE_URL        = 'https://imgur.com/PucSebJ.jpg';
const ASTRID_URL              = 'https://imgur.com/hOgNLiF.jpg';
const ASTRID_2_URL            = 'https://imgur.com/OifK29M.jpg';
const ASTRID_JG_URL           = 'https://imgur.com/EJcDD5W.jpg';
const AZZENKA_URL             = 'https://imgur.com/fYb437B.jpg';
const BALDUM_URL              = 'https://imgur.com/7jMf2n7.jpg';
const BALDUM_2_URL            = 'https://imgur.com/tHEMoGz.jpg';
const BALDUM_SOLO_URL         = 'https://imgur.com/tLQjb78.jpg';
const BATMAN_URL              = 'https://imgur.com/jUjPPns.jpg';
const BRUNHILDA_JG_URL        = 'https://imgur.com/i8hjCYw.jpg';
const BRUNHILDA_LANE_URL      = 'https://imgur.com/XGx1nrj.jpg';
const BUTTERFLY_AD_URL        = 'https://imgur.com/Uu5PMbN.jpg';
const BUTTERFLY_TANK_URL      = 'https://imgur.com/wathWg2.jpg';
const CAPHENY_LANE_URL        = 'https://imgur.com/ywPtZ5M.jpg';
const CAPHENY_LANE2_URL       = 'https://imgur.com/XFOSKjm.jpg';
const CAPHENY_LANE3_URL       = 'https://imgur.com/t2zgSkQ.jpg';
const CAPHENY_JG_URL          = 'https://imgur.com/91yUc0g.jpg';
const CHAUGNAR_AP_URL         = 'https://imgur.com/t1DegVc.jpg';
const CHAUGNAR_TANK_URL       = 'https://imgur.com/ttaxPaS.jpg';
const CHAUGNAR_SOLO_URL       = 'https://imgur.com/8a9HVZB.jpg';
const CHAUGNAR_PUNIR_URL      = 'https://imgur.com/Ni37993.jpg';
const CRESHT_SOLO_URL         = 'https://i.imgur.com/7LBcLt1.jpg';
const CRESHT_SUPORTE_URL      = 'https://i.imgur.com/ENQPAJs.jpg';
const DARCY_MID_URL           = 'https://i.imgur.com/rTtpWeP.jpg';
const DARCY_MID_2_URL         = 'https://i.imgur.com/jxnJDjG.jpg';
const DARCY_JG_URL            = 'https://imgur.com/MEhvHpL.jpg';
const DIAOCHAN_MID_URL        = 'https://i.imgur.com/TD4SJKh.jpg';
const DIAOCHAN_SUP_URL        = 'https://i.imgur.com/GFCHu1t.jpg';
const ELANDORR_URL            = 'https://imgur.com/v95AKCn.jpg';
const ELANDORR_JG_URL         = 'https://imgur.com/v95AKCn.jpg';
const ELSU_URL                = 'https://imgur.com/v95AKCn.jpg';
const ENZO_URL                = 'https://imgur.com/0wAGHYB.jpg';
const ENZO2_URL               = 'https://imgur.com/mfzWXIL.jpg';
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
const ISHAR_URL               = 'https://i.imgur.com/Py4TI4b.jpg';
const ISHAR_SUP_URL           = 'https://i.imgur.com/Py4TI4b.jpg';
const JINNAR_URL              = 'https://i.imgur.com/iyrozwe.jpg';
const KAHLII_URL              = 'https://i.imgur.com/xvVwP4v.jpg';
const KILGROTH_URL            = 'https://imgur.com/6Jho5cM.jpg';
const KILGROTH_2URL           = 'https://imgur.com/hLlppFl.jpg';
const KRIKNAK_URL             = 'https://i.imgur.com/i0fLrfP.jpg';
const KRIXI_URL               = 'https://i.imgur.com/QISvmts.jpg';
const KRIZZIX_URL             = 'https://i.imgur.com/QISvmts.jpg';
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
const OMEN_URL                = 'https://imgur.com/V6idNcU.jpg';
const OMEN_2_URL              = 'https://imgur.com/V91Q13e.jpg';
const ORMARR_URL              = 'https://i.imgur.com/9NlNyEG.jpg';
const PEURA_URL               = 'https://i.imgur.com/cNEGBit.jpg';
const PREYTA_URL              = 'https://i.imgur.com/RJycCsJ.jpg';
const QI_URL                  = 'https://imgur.com/kh2BgJZ.jpg';
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
const VERES_URL               = 'https://imgur.com/olYygXS.jpg';
const VERES_TANK_URL          = 'https://i.imgur.com/IjqyeDf.jpg';
const VIOLET_LANE_URL         = 'https://i.imgur.com/XAIKkh3.jpg';
const VIOLET_JG_URL           = 'https://i.imgur.com/o656Gox.jpg';
const VOLKATH_URL             = 'https://i.imgur.com/XAIKkh3.jpg';
const VOLKATH_JG_URL          = 'https://i.imgur.com/o656Gox.jpg';
const WIRO_URL                = 'https://i.imgur.com/nyrfGNA.jpg';
const WISP_URL                = 'https://imgur.com/WbOgG6K.jpg';
const WISP_JG_URL             = 'https://imgur.com/gdHgZb5.jpg';
const WONDERWOMAN_URL         = 'https://i.imgur.com/n8eVNAR.jpg';
const WUKONG_URL              = 'https://i.imgur.com/LiWNnBK.jpg';
const WUKONG_LANE_URL         = 'https://imgur.com/uucOaCQ.jpg';
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
const ZILL_URL                = 'https://imgur.com/dtlXiyO.jpg';
const ZIP_URL                 = 'https://imgur.com/hCL8IFk.jpg';
const ZIP_2_URL               = 'https://i.imgur.com/RC62pgL.jpg';
const ZUKA_URL                = 'https://i.imgur.com/93Hu2Jl.jpg';


////////////////////////////////////////////////////////////////////
//                             URL RUNAS                          //
////////////////////////////////////////////////////////////////////

const RUNAS_URL                = 'https://imgur.com/Jumv8Xa.jpg';
const AUTOATTACK_ADC_URL       = 'https://imgur.com/bqjAvem.jpg';
const SKILLBASED_ADC_URL       = 'https://imgur.com/aHpPRpG.jpg';
const LONGRANGED_ADC_URL       = 'https://imgur.com/G3ESbt7.jpg';
const BURST_ASSASSIN_URL       = 'https://imgur.com/FnZrBaY.jpg';
const SUSTA_ASSASSIN_URL       = 'https://imgur.com/ZDhUhWg.jpg';
const BURST_WARRIOR_URL        = 'https://imgur.com/lsdDZYa.jpg';
const SUSTAIN_WARRIOR_URL      = 'https://imgur.com/FcY0lUI.jpg';
const BURST_MAGE_URL           = 'https://imgur.com/79Oagiu.jpg';
const POKE_MAGE_URL            = 'https://imgur.com/8hTGt6d.jpg';
const SUPORT_TANK_TF_URL       = 'https://imgur.com/FcY0lUI.jpg';
const SUPORT_TANK_CC_URL       = 'https://imgur.com/9qJiLO0.jpg';
const SUPORT_LONGRANGE_URL     = 'https://imgur.com/pKCuppw.jpg';


const AIRI_RUNA_URL           = 'https://imgur.com/NhF0sTy.jpg';
const ALEISTER_RUNA_URL       = 'https://imgur.com/Yq1ieC4.jpg';
const ALICE_RUNA_URL          = 'https://imgur.com/FIXFGgl.jpg';
const AMILY_RUNA_URL          = 'https://imgur.com/Wabb96x.jpg';
const ANNETE_RUNA_URL         = 'https://imgur.com/gPXV31u.jpg';
const ARDUIN_RUNA_URL         = 'https://imgur.com/m0Z8INO.jpg';
const ARTHUR_RUNA_URL         = 'https://imgur.com/Ei7TTWF.jpg';
const ARUM_RUNA_URL           = 'https://imgur.com/ARMAVIr.jpg';
const ASTRID_RUNA_URL         = 'https://imgur.com/8OzxnEv.jpg';
const AZZENKA_RUNA_URL        = 'https://imgur.com/nvPvgl0.jpg';
const BALDUM_RUNA_URL         = '';
const BATMAN_RUNA_URL         = '';
const BRUNHILDA_RUNA_URL      = '';
const BUTTERFLY_RUNA_URL      = '';
const CAPHENY_RUNA_URL        = '';
const CHAUGNAR_RUNA_URL       = '';
const CRESHT_RUNA_URL         = '';
const DARCY_RUNA_URL          = '';
const DIAOCHAN_RUNA_URL       = '';
const ELSU_RUNA_URL           = '';
const ENZO_RUNA_URL           = '';
const ERROL_RUNA_URL          = '';
const FENNIK_RUNA_URL         = '';
const FLORENTINO_RUNA_URL     = '';
const GILDUR_RUNA_URL         = '';
const GRAKK_RUNA_URL          = '';
const HAYATE_RUNA_URL         = '';
const IGNIS_RUNA_URL          = '';
const ILUMIA_RUNA_URL         = '';
const JINNAR_RUNA_URL         = '';
const KAHLII_RUNA_URL         = '';
const KILGROTH_RUNA_URL       = '';
const KRIKNAK_RUNA_URL        = '';
const KRIXI_RUNA_URL          = '';
const LAURIEL_RUNA_URL        = '';
const LILIANA_RUNA_URL        = '';
const LINDIS_RUNA_URL         = '';
const LUBU_RUNA_URL           = '';
const LUMBURR_RUNA_URL        = '';
const MALOCH_RUNA_URL         = '';
const MARJA_RUNA_URL          = '';
const MAX_RUNA_URL            = '';
const MGANGA_RUNA_URL         = '';
const MINA_RUNA_URL           = '';
const MOREN_RUNA_URL          = '';
const MURAD_RUNA_URL          = '';
const NAKROTH_RUNA_URL        = '';
const NATALYA_RUNA_URL        = '';
const OMEGA_RUNA_URL          = '';
const OMEN_RUNA_URL           = '';
const ORMARR_RUNA_URL         = '';
const PEURA_RUNA_URL          = '';
const PREYTA_RUNA_URL         = '';
const QI_RUNA_URL             = '';
const QUILLEN_RUNA_URL        = '';
const RAZ_RUNA_URL            = '';
const RIKTOR_RUNA_URL         = '';
const ROURKE_RUNA_URL         = '';
const ROXIE_RUNA_URL          = '';
const RYOMA_RUNA_URL          = '';
const SEPHERA_RUNA_URL        = '';
const SKUD_RUNA_URL           = '';
const SLIMZ_RUNA_URL          = '';
const SUPERMAN_RUNA_URL       = '';
const TAARA_RUNA_URL          = '';
const TEEMEE_RUNA_URL         = '';
const TELANNAS_RUNA_URL       = '';
const THANE_RUNA_URL          = '';
const THEFLASH_RUNA_URL       = '';
const THEJOKER_RUNA_URL       = '';
const TULEN_RUNA_URL          = '';
const VALHEIN_RUNA_URL        = '';
const VEERA_RUNA_URL          = '';
const VERES_RUNA_URL          = '';
const VIOLET_RUNA_URL         = '';
const WIRO_RUNA_URL           = '';
const WISP_RUNA_URL           = '';
const WONDERWOMAN_RUNA_URL    = '';
const WUKONG_RUNA_URL         = '';
const XENIEL_RUNA_URL         = '';
const YBNETH_RUNA_URL         = '';
const YENA_RUNA_URL           = '';
const YORN_RUNA_URL           = '';
const ZANIS_RUNA_URL          = '';
const ZEPHYS_RUNA_URL         = '';
const ZILL_RUNA_URL           = '';
const ZIP_RUNA_URL            = '';
const ZUKA_RUNA_URL           = '';

////////////////////////////////////////////////////////////////////
//                             URL GUIAS                          //
////////////////////////////////////////////////////////////////////

const AIRI_GUIA_NNOITRA_URL           = 'https://imgur.com/IsizDGg.jpg';
const ALEISTER_GUIA_NNOITRA_URL       = 'https://imgur.com/DW2F4VN.jpg';
const ALICE_GUIA_NNOITRA_URL          = 'https://imgur.com/h7tXK48.jpg';
const AMILY_GUIA_NNOITRA_URL          = 'https://imgur.com/D95t9f5.jpg';
const ANNETE_GUIA_NNOITRA_URL         = 'https://imgur.com/7oX4uvM.jpg';
const ARDUIN_GUIA_NNOITRA_URL         = 'https://imgur.com/EkE0PGY.jpg';
const ARTHUR_GUIA_NNOITRA_URL         = 'https://imgur.com/fqi7lxs.jpg';
const ARUM_GUIA_NNOITRA_URL           = 'https://imgur.com/syrjlxv.jpg';
const ASTRID_GUIA_NNOITRA_URL         = 'https://imgur.com/nXJEkpA.jpg';
const AZZENKA_GUIA_NNOITRA_URL        = 'https://imgur.com/glaAwnB.jpg';
const BALDUM_GUIA_NNOITRA_URL         = '';
const BATMAN_GUIA_NNOITRA_URL         = '';
const BRUNHILDA_GUIA_NNOITRA_URL      = '';
const BUTTERFLY_GUIA_NNOITRA_URL      = '';
const CAPHENY_GUIA_NNOITRA_URL        = '';
const CHAUGNAR_GUIA_NNOITRA_URL       = '';
const CRESHT_GUIA_NNOITRA_URL         = '';
const DARCY_GUIA_NNOITRA_URL          = '';
const DIAOCHAN_GUIA_NNOITRA_URL       = '';
const ELSU_GUIA_NNOITRA_URL           = '';
const ENZO_GUIA_NNOITRA_URL           = '';
const ERROL_GUIA_NNOITRA_URL          = '';
const FENNIK_GUIA_NNOITRA_URL         = '';
const FLORENTINO_GUIA_NNOITRA_URL     = '';
const GILDUR_GUIA_NNOITRA_URL         = '';
const GRAKK_GUIA_NNOITRA_URL          = '';
const HAYATE_GUIA_NNOITRA_URL         = '';
const IGNIS_GUIA_NNOITRA_URL          = '';
const ILUMIA_GUIA_NNOITRA_URL         = '';
const JINNAR_GUIA_NNOITRA_URL         = '';
const KAHLII_GUIA_NNOITRA_URL         = '';
const KILGROTH_GUIA_NNOITRA_URL       = '';
const KRIKNAK_GUIA_NNOITRA_URL        = '';
const KRIXI_GUIA_NNOITRA_URL          = '';
const LAURIEL_GUIA_NNOITRA_URL        = '';
const LILIANA_GUIA_NNOITRA_URL        = '';
const LINDIS_GUIA_NNOITRA_URL         = '';
const LUBU_GUIA_NNOITRA_URL           = '';
const LUMBURR_GUIA_NNOITRA_URL        = '';
const MALOCH_GUIA_NNOITRA_URL         = '';
const MARJA_GUIA_NNOITRA_URL          = '';
const MAX_GUIA_NNOITRA_URL            = '';
const MGANGA_GUIA_NNOITRA_URL         = '';
const MINA_GUIA_NNOITRA_URL           = '';
const MOREN_GUIA_NNOITRA_URL          = '';
const MURAD_GUIA_NNOITRA_URL          = '';
const NAKROTH_GUIA_NNOITRA_URL        = '';
const NATALYA_GUIA_NNOITRA_URL        = '';
const OMEGA_GUIA_NNOITRA_URL          = '';
const OMEN_GUIA_NNOITRA_URL           = '';
const ORMARR_GUIA_NNOITRA_URL         = '';
const PEURA_GUIA_NNOITRA_URL          = '';
const PREYTA_GUIA_NNOITRA_URL         = '';
const QI_GUIA_NNOITRA_URL             = '';
const QUILLEN_GUIA_NNOITRA_URL        = '';
const RAZ_GUIA_NNOITRA_URL            = '';
const RIKTOR_GUIA_NNOITRA_URL         = '';
const ROURKE_GUIA_NNOITRA_URL         = '';
const ROXIE_GUIA_NNOITRA_URL          = '';
const RYOMA_GUIA_NNOITRA_URL          = '';
const SEPHERA_GUIA_NNOITRA_URL        = '';
const SKUD_GUIA_NNOITRA_URL           = '';
const SLIMZ_GUIA_NNOITRA_URL          = '';
const SUPERMAN_GUIA_NNOITRA_URL       = '';
const TAARA_GUIA_NNOITRA_URL          = '';
const TEEMEE_GUIA_NNOITRA_URL         = '';
const TELANNAS_GUIA_NNOITRA_URL       = '';
const THANE_GUIA_NNOITRA_URL          = '';
const THEFLASH_GUIA_NNOITRA_URL       = '';
const THEJOKER_GUIA_NNOITRA_URL       = '';
const TULEN_GUIA_NNOITRA_URL          = '';
const VALHEIN_GUIA_NNOITRA_URL        = '';
const VEERA_GUIA_NNOITRA_URL          = '';
const VERES_GUIA_NNOITRA_URL          = '';
const VIOLET_GUIA_NNOITRA_URL         = '';
const WIRO_GUIA_NNOITRA_URL           = '';
const WISP_GUIA_NNOITRA_URL           = '';
const WONDERWOMAN_GUIA_NNOITRA_URL    = '';
const WUKONG_GUIA_NNOITRA_URL         = '';
const XENIEL_GUIA_NNOITRA_URL         = '';
const YBNETH_GUIA_NNOITRA_URL         = '';
const YENA_GUIA_NNOITRA_URL           = '';
const YORN_GUIA_NNOITRA_URL           = '';
const ZANIS_GUIA_NNOITRA_URL          = '';
const ZEPHYS_GUIA_NNOITRA_URL         = '';
const ZILL_GUIA_NNOITRA_URL           = '';
const ZIP_GUIA_NNOITRA_URL            = '';
const ZUKA_GUIA_NNOITRA_URL           = '';

////////////////////////////////////////////////////////////////////
//                             URL DICAS                          //
////////////////////////////////////////////////////////////////////

const AIRI_DICA_NNOITRA_URL           = 'https://imgur.com/rW5DWhR.jpg';
const ALEISTER_DICA_NNOITRA_URL       = 'https://imgur.com/TOGjccy.jpg';
const ALICE_DICA_NNOITRA_URL          = 'https://imgur.com/AIUxx7M.jpg';
const AMILY_DICA_NNOITRA_URL          = 'https://imgur.com/CIdOsnC.jpg';
const ANNETE_DICA_NNOITRA_URL         = 'https://imgur.com/prQx7P6.jpg';
const ARDUIN_DICA_NNOITRA_URL         = 'https://imgur.com/me7OLsk.jpg';
const ARTHUR_DICA_NNOITRA_URL         = 'https://imgur.com/8iJ6TiT.jpg';
const ARUM_DICA_NNOITRA_URL           = 'https://imgur.com/tj8WZQH.jpg';
const ASTRID_DICA_NNOITRA_URL         = 'https://imgur.com/qK7kDx7.jpg';
const AZZENKA_DICA_NNOITRA_URL        = 'https://imgur.com/XPBZ9X9.jpg';
const BALDUM_DICA_NNOITRA_URL         = '';
const BATMAN_DICA_NNOITRA_URL         = '';
const BRUNHILDA_DICA_NNOITRA_URL      = '';
const BUTTERFLY_DICA_NNOITRA_URL      = '';
const CAPHENY_DICA_NNOITRA_URL        = '';
const CHAUGNAR_DICA_NNOITRA_URL       = '';
const CRESHT_DICA_NNOITRA_URL         = '';
const DARCY_DICA_NNOITRA_URL          = '';
const DIAOCHAN_DICA_NNOITRA_URL       = '';
const ELSU_DICA_NNOITRA_URL           = '';
const ENZO_DICA_NNOITRA_URL           = '';
const ERROL_DICA_NNOITRA_URL          = '';
const FENNIK_DICA_NNOITRA_URL         = '';
const FLORENTINO_DICA_NNOITRA_URL     = '';
const GILDUR_DICA_NNOITRA_URL         = '';
const GRAKK_DICA_NNOITRA_URL          = '';
const HAYATE_DICA_NNOITRA_URL         = '';
const IGNIS_DICA_NNOITRA_URL          = '';
const ILUMIA_DICA_NNOITRA_URL         = '';
const JINNAR_DICA_NNOITRA_URL         = '';
const KAHLII_DICA_NNOITRA_URL         = '';
const KILGROTH_DICA_NNOITRA_URL       = '';
const KRIKNAK_DICA_NNOITRA_URL        = '';
const KRIXI_DICA_NNOITRA_URL          = '';
const LAURIEL_DICA_NNOITRA_URL        = '';
const LILIANA_DICA_NNOITRA_URL        = '';
const LINDIS_DICA_NNOITRA_URL         = '';
const LUBU_DICA_NNOITRA_URL           = '';
const LUMBURR_DICA_NNOITRA_URL        = '';
const MALOCH_DICA_NNOITRA_URL         = '';
const MARJA_DICA_NNOITRA_URL          = '';
const MAX_DICA_NNOITRA_URL            = '';
const MGANGA_DICA_NNOITRA_URL         = '';
const MINA_DICA_NNOITRA_URL           = '';
const MOREN_DICA_NNOITRA_URL          = '';
const MURAD_DICA_NNOITRA_URL          = '';
const NAKROTH_DICA_NNOITRA_URL        = '';
const NATALYA_DICA_NNOITRA_URL        = '';
const OMEGA_DICA_NNOITRA_URL          = '';
const OMEN_DICA_NNOITRA_URL           = '';
const ORMARR_DICA_NNOITRA_URL         = '';
const PEURA_DICA_NNOITRA_URL          = '';
const PREYTA_DICA_NNOITRA_URL         = '';
const QI_DICA_NNOITRA_URL             = '';
const QUILLEN_DICA_NNOITRA_URL        = '';
const RAZ_DICA_NNOITRA_URL            = '';
const RIKTOR_DICA_NNOITRA_URL         = '';
const ROURKE_DICA_NNOITRA_URL         = '';
const ROXIE_DICA_NNOITRA_URL          = '';
const RYOMA_DICA_NNOITRA_URL          = '';
const SEPHERA_DICA_NNOITRA_URL        = '';
const SKUD_DICA_NNOITRA_URL           = '';
const SLIMZ_DICA_NNOITRA_URL          = '';
const SUPERMAN_DICA_NNOITRA_URL       = '';
const TAARA_DICA_NNOITRA_URL          = '';
const TEEMEE_DICA_NNOITRA_URL         = '';
const TELANNAS_DICA_NNOITRA_URL       = '';
const THANE_DICA_NNOITRA_URL          = '';
const THEFLASH_DICA_NNOITRA_URL       = '';
const THEJOKER_DICA_NNOITRA_URL       = '';
const TULEN_DICA_NNOITRA_URL          = '';
const VALHEIN_DICA_NNOITRA_URL        = '';
const VEERA_DICA_NNOITRA_URL          = '';
const VERES_DICA_NNOITRA_URL          = '';
const VIOLET_DICA_NNOITRA_URL         = '';
const WIRO_DICA_NNOITRA_URL           = '';
const WISP_DICA_NNOITRA_URL           = '';
const WONDERWOMAN_DICA_NNOITRA_URL    = '';
const WUKONG_DICA_NNOITRA_URL         = '';
const XENIEL_DICA_NNOITRA_URL         = '';
const YBNETH_DICA_NNOITRA_URL         = '';
const YENA_DICA_NNOITRA_URL           = '';
const YORN_DICA_NNOITRA_URL           = '';
const ZANIS_DICA_NNOITRA_URL          = '';
const ZEPHYS_DICA_NNOITRA_URL         = '';
const ZILL_DICA_NNOITRA_URL           = '';
const ZIP_DICA_NNOITRA_URL            = '';
const ZUKA_DICA_NNOITRA_URL           = '';

////////////////////////////////////////////////////////////////////
//                   Lista de Roles por Heroi  HEROINOVO          //
////////////////////////////////////////////////////////////////////

const HEROIS_SOLO     = ["Florentino", "Riktor", "Maloch", "Marja", "Superman", "Xeniel", "Omen", "YBneth", "Cresht", 
                        "Ryoma", "Max", "Arum", "Wonder Woman", "Skud", "Airi", "Roxie", "Amily", "LuBu", 
                        "Arduin", "Rourke", "Zuka", "Baldum", "Arthur", "Omega", "KilGroth", "Zanis", "Gildur", 
                        "Wukong", "Astrid", "Taara", "Veres", "Valhein", "Errol", "Yena", "Chaugnar", "Qi", "Volkath"];

const HEROIS_LANE     = ["Elsu", "TelAnnas", "Valhein", "TheJoker", "Yorn", "Wisp", "Lindis", "Violet", "Fennik", "Moren", "Hayate", "Capheny", "Brunhilda", "Elandorr"];

const HEROIS_MID      = ["Sephera", "Tulen", "Liliana", "Raz", "Ignis", "Natalya", "TheFlash", "Kahlii", "Lauriel", 
                        "Aleister", "Ilumia", "Jinnar", "Mganga", "Krixi", "Diaochan", "Preyta", "Gildur", "Veera", "Azzenka", 
                        "Annette", "Darcy", "Ishar"];

const HEROIS_SUPORTE  = ["Annette", "YBneth", "Gildur", "TeeMee", "Baldum", "Sephera", "Peura", "Mina", "Grakk", "Chaugnar", "Alice",
                        "Arum", "Thane", "Ormarr", "Cresht", "Riktor", "Xeniel", "Lumburr", "Arduin", "Superman", "Aleister", "Diaochan", "Zip", "Krizzix", "Ishar"];

const HEROIS_JUNGLE   = ["Lindis", "Rourke", "Quillen", "Violet", "Nakroth", "Zephys", "Murad", "Elsu", "Kriknak", "Zill", "Slimz", "Ryoma", 
                        "Moren", "Zanis", "Wukong", "Wisp", "Fennik","KilGroth", "Butterfly", "Tulen", "Raz", "Batman", "Wonder Woman", "Astrid",
                        "Airi", "Amily", "Zuka", "Florentino", "Darcy", "Hayate", "Capheny","Errol", "Enzo", "Brunhilda", "Elandorr", "Volkath"];

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

const ultimasAtualizacoes_1 = "Últimos heróis adicionados:Zip!\n\nÚltimas builds adicionadas: Zip, Darcy, Zill\n\nBuilds atualizadas de acordo com patch de junho/2019\n\nPeço desculpas pela demora em relação a Ishar e Volkath, mas outros serviços estão na fila com Dicas e Counters.";
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

const ARCANA_GREEN_BASTIAO         = {"nome" : "Bastião", "Atributos" : "Armadura +9"};
const ARCANA_GREEN_ACODURO         = {"nome" : "Aço Duro", "Atributos" : "Armadura +5, Defesa Mágica +5"};
const ARCANA_GREEN_VALOR           = {"nome" : "Valor", "Atributos" : "Vida Máxima +37.5, Redução de Recarga +0.6%"};
const ARCANA_GREEN_PERICIA         = {"nome" : "Pericia", "Atributos" : "Defesa Mágica +9"};
const ARCANA_GREEN_MALEFICIO       = {"nome" : "Maleficio", "Atributos" : "Poder de Habilidade +2.4, Redução de Recarga +0.7%"};
const ARCANA_GREEN_FERRAO          = {"nome" : "Espeto", "Atributos" : "Dano de Ataque +0.9, Perfuração de Armadura +6.4"};
const ARCANA_GREEN_AGITACAO        = {"nome" : "Agitar", "Atributos" : "Velocidade de Ataque +0.6%, Perfuração Mágica +6.4"};
const ARCANA_GREEN_FOCO            = {"nome" : "Foco", "Atributos" : "Redução de Recarga +1%"};
const ARCANA_GREEN_CONSUMACAO      = {"nome" : "Consumir", "Atributos" : "Roubo Mágico de Vida +0.7%, Armadura +5.9"};
const ARCANA_GREEN_Crusado         = {"nome" : "Crusado", "Atributos" : "Armadura +2.7, Defesa Mágica +2.7, Redução de Recarga +0.6%"};
const ARCANA_GREEN_LIST            = [ARCANA_GREEN_BASTIAO, ARCANA_GREEN_ACODURO, ARCANA_GREEN_VALOR, ARCANA_GREEN_PERICIA, ARCANA_GREEN_MALEFICIO, ARCANA_GREEN_FERRAO, ARCANA_GREEN_AGITACAO, ARCANA_GREEN_FOCO, ARCANA_GREEN_CONSUMACAO, ARCANA_GREEN_Crusado];



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
const info_taxaCrit = {"termo":"taxaCritica", "definicao":"É chance % de um ataque normal ser crítico, ou seja, ser um golpe mais forte"};
const info_danoCrit = {"termo":"danoCritico", "definicao":"É o quão forte vai ser o ataque caso esse seja um ataque crítico"};
const info_backdoor = {"termo":"backdoor", "definicao":"É quando um herói ou o time ataca a base inimiga enquanto não existe nenhum mínion ou inimigo por ali, geralmente é feito quando só tem o Nexus ou a T3 e ela está com pouco HP."};
const info_sustain = {"termo":"sustain", "definicao":"É quando um herói possui habilidades que aumentam sua defesa, seja regenerando HP ou aumentando sua armadura, de forma que permita ele de permanecer mais tempo numa TF."};

const globalGlossario = [info_sustain,info_backdoor,info_danoCrit,info_taxaCrit,info_kit,info_backline,info_frontline,info_melee,info_range,info_AoV,info_pvp,info_bots,info_hp,info_mp,info_AD,info_AP,info_OP,info_Nerf,info_gank,info_farm,info_burst,info_cooldown,info_CDR,info_autoattack,info_poke,info_carry,info_ADC,info_TF,info_Roam,info_SplitPush,info_proxy,info_flick,info_feedar,info_buff,info_stack,info_bait,info_dive,info_bush];

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
  
  function ultimasAtualizacoes(agent){

    //agent.add("Só um instante");
    //agent.add("Pronto, atualizei as builds dos seguintes heróis:");
    agent.add(ultimasAtualizacoes_1);
    //agent.add('Caso esteja sentindo falta de alguma build');
    //agent.add('É só comentar no post fixo da página que em breve eu adiciono aqui!');       

  }

  function listar_menu(agent){
    agent.add("Serviços do Maloch Bot:");
    agent.add("Builds - digite:\n\n´build [herói] (lane)´\nex: build violet jg");
    agent.add("Arcanas - digite:\n\n´arcanas informações´ - menu de arcanas\n\n´arcanas [herói] ou arcanas [classe]´\nex: arcanas tulen\narcanas atirador");
    agent.add("Últimas atualizações do bot - digite:\n\n´últimas atualizações´");
    agent.add("Legenda:\n\nentre [] é obrigatório\nentre () opcional\n\nNão necessário digitar [] ou (), apenas palavras");
  } 

  function listarAlgo(agent){
  
    const arcanas  = agent.parameters.Arcanas;
    const list     = agent.parameters.listar;  
    const cor      = agent.parameters.arcanas_cores;
    const theBest  = agent.parameters.Superioridade;
    const boots    = agent.parameters.boots;
    const hero     = agent.parameters.herois;
    const role     = agent.parameters.roles;
    const lane     = agent.parameters.lanes;

    let filtro = { lista:list, best:theBest, arcana:arcanas, botas:boots, heroi:hero, funcao:role, papel:lane }; 

    if(filtro.lista == "Listar") {
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
              agent.add('Bastião, Aço Duro, Valor, Pericia, Maleficio, Espeto, Agitar, Foco, Consumir e Crusado.');
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
      
      if(filtro.funcao){
        agent.add('Os heróis que podem jogar como '+filtro.funcao+' são:');
        switch(filtro.funcao){
          case 'Lane':
            agent.add('Capheny, Elsu, Fennik, Hayate, Lindis, Moren, TelAnnas, The Joker, Valhein, Violet, Wisp, Yorn, Brunhilda, Elandorr');
            break;
          case 'Solo':
            agent.add('Airi, Amily, Arduin, Arthur, Arum, Astrid, Baldum, Chaugnar, Cresht, Errol, Florentino, Gildur, KilGroth, Lu Bu, Maloch, Marja, Max, Omega, Omen, Riktor, Rourke, Roxie, Ryoma, Skud, Superman, Taara, Valhein, Veres, Wonder Woman, Wukong, Xeniel, YBneth, Yena, Zanis, Zuka, Volkath');
            break;
          case 'Jungle':
            agent.add('Airi, Amily, Astrid, Batman, Brunhilda, Butterfly, Capheny, Darcy, Elsu, Enzo, Errol, Fennik, Florentino, Hayate, Kriknak, KilGroth, Lindis, Moren, Murad, Nakroth, Quillen, Raz, Rourke, Ryoma, Slimz, Tulen, Violet, Wisp, Wonder Woman, Wukong, Zanis, Zephys, Zill, Zuka, Volkath, Elandor');
            break;
          case 'Mid':
            agent.add('Aleister, Annette, Azzenka, DArcy, Diaochan, Elsu, Gildur, Ignis, Ilumia, Ishar, Jinnar, Kahlii, Krixi, Lauriel, Liliana, Mganga, Natalya, Preyta, Raz, Sephera, The Flash, Tulen, Veera');
            break;
          case 'Suporte':
            agent.add('Aleister, Alice, Annette, Arduin, Arum, Baldum, Chaugnar, Cresht, Diaochan, Gildur, Grakk, Lumburr, Mina, Ormarr, Peura, Riktor, Sephera, Superman, TeeMee, Thane, Xeniel, YBneth, Zip, Krizzix, Ishar');
            break;
        }
      }
    
    }

    if(filtro.lista == "função") {
      if(filtro.papel){
        agent.add('As funções das lanes são divididas entre: Mid, Solo, Adc, Jungler, Suporte e cada função é responsável por determinada área do mapa, mas todos os heróis devem proteger as torres independente de qual lane seja');
        agent.add('Se seu time perde uma torre do mid, não foi o herói do mid que perdeu, todo o time perdeu, pois a torre não volta mais, portanto tenha em mente que cada herói tem sua função na lane que está designado, mas todos devem proteger torres'); 
        agent.add('Caso queira saber mais sobre cada função, basta me solicitar dicas e falar a lane');
      }
      if(filtro.herois){
        agent.add('Os heróis são divididos entre: Mago, Atirador, Guerreiro, Assassino e Suporte. Para saber melhor sobre cada uma, basta pedir dicas dessa classe');
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
    const role       = agent.parameters.roles;
    const informacao = agent.parameters.informacao;

    let filtro = { hero:heroi, funcao:role, info: informacao}; 
    
    if (build && !filtro.hero && !filtro.info && !filtro.funcao) {
      agent.add('Entendi que você quer builds, mas de qual herói? Se quiser listar meus comandos, basta digitar: ´builds informações´');
    } 

    if (build && !filtro.hero && !filtro.info && filtro.funcao) {
      agent.add('Entendi que você quer jogar como '+filtro.funcao+', mas com qual herói? Se quiser listar meus comandos, basta digitar: ´builds informações´');
    } 

    if(build && filtro.info){
      agent.add('Para solicitar builds digite:\n\n´build [herói] (lane)´\nex: build hayate ou build hayate jg');
      agent.add("Legenda:\n\nentre [] é obrigatório\nentre () opcional\n\nNão necessário digitar [] ou (), apenas palavras");
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
		        agent.add('Aqui sua build:');
		        agent.add(new Image(ALEISTER_URL));
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
          agent.add(new Image(ALICE_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
          agent.add('Anel do Amigo, é o mais recomendado se tiver inimigo que fica invisível.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Tenho essa aqui:');
                agent.add(new Image(ALICE_URL));
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
          agent.add('Aqui, tenho essa build para você');
          agent.add(new Image(ANNETE_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar');
          agent.add('Anel do Amigo, é o mais recomendado se tiver inimigo que fica invisível.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Aqui, tenho essa build para você');
                agent.add(new Image(ANNETE_URL));
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
                agent.add('Tenho essa:');
                agent.add(new Image(ARDUIN_URL));
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

      case 'Brunhilda':

        agent.add('Hm, então quer dizer que resolveu jogar de Brunhilda...');
        if (!filtro.funcao) {
          agent.add('Tenho essa:');
          agent.add(new Image(BRUNHILDA_LANE_URL));
          agent.add('Caso queira ir jungle:');
          agent.add(new Image(BRUNHILDA_JG_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
		        agent.add('Tenho essa:');
		        agent.add(new Image(BRUNHILDA_JG_URL));
                break;
              case 'Lane':
		        agent.add('Tenho essa:');
		        agent.add(new Image(BRUNHILDA_LANE_URL));
                break;
            }
          } else {
            agent.add('Mas você quer jogar como '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Brunhilda é melhor se jogar na lane ou na jungle!');
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
          agent.add('Caso queira jogar na Solo:');
          agent.add(new Image(CHAUGNAR_SOLO_URL));
          agent.add('Você pode terminar a Égide antes ou não dependendo do seu consumo de mana e trocar o primeiro item dependendo da necessidade.');
          agent.add('Caso seja o suporte:');
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
              case 'Solo':
                agent.add('Caso queira usar Flick ou Executar:');
                agent.add(new Image(CHAUGNAR_SOLO_URL));
                agent.add('Mas você pode usar Punir e ir com essa aqui:');
                agent.add(new Image(CHAUGNAR_PUNIR_URL));
                agent.add('Jogue igual uma Roxie, com proxy/invade e ajudando em tfs pois você fica muito tank!');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Chaugnar é melhor se utilizado como suporte ou na solo!');
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

        agent.add('Hm, então quer dizer que resolveu jogar de D’Arcy... ');
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
                break;
              case 'Mid':
                agent.add('Pronto, achei essa build:');
                agent.add(new Image(DARCY_MID_URL));
                agent.add('Mas também tenho essa');
                agent.add(new Image(DARCY_MID_2_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O D’Arcy é melhor se utilizado na Jungle ou no Mid!');
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
      
      case 'Elandorr':

        agent.add('Hm, então quer dizer que resolveu jogar de Eland´orr...');
        if (!filtro.funcao) {
          agent.add('Por enquanto só tenho essa:');
          agent.add(new Image(ELANDORR_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(ELANDORR_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(ELANDORR_JG_URL));
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Eland´orr é melhor se utilizado na Lane ou Jungle!');
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

      case 'Enzo':

        agent.add('Hm, então quer dizer que resolveu jogar de Enzo...');
        if (!filtro.funcao) {
          agent.add('Por enquanto só tenho essas:');
          agent.add(new Image(ENZO_URL));
          agent.add(new Image(ENZO2_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Jungle':
                agent.add('Aqui oh, tenho essas:');
                agent.add(new Image(ENZO_URL));
                agent.add(new Image(ENZO2_URL));
                break;
              case 'Suporte':
                agent.add('Aqui oh, tenho essa:');
                agent.add('Mentira, não tenho, pfv não joga com ele como suporte, herói foi feito pra bater e matar, não pra dar suporte, basta ler a passiva dele pra entender isso');
                break;
              }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Enzo é melhor se utilizado na Jungle!');
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
          agent.add(new Image(FENNIK_URL));
          agent.add(new Image(FENNIK_2_URL));
                agent.add('Se você tiver iniciando com ele, te recomendo a primeira!');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Lane':
                agent.add(BUILD_EM_BREVE);
                break;
              case 'Jungle':
                agent.add('Aqui, tenho duas:');
                agent.add(new Image(FENNIK_URL));
                agent.add(new Image(FENNIK_2_URL));
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

      case 'Ishar':

        agent.add('Hm, então quer dizer que resolveu jogar de Ishar...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ISHAR_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Mid':
                agent.add('Aqui');
                agent.add(new Image(ISHAR_URL));
                break;
              case 'Suporte':
                agent.add('Aqui');
                agent.add(new Image(ISHAR_SUP_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Ishar é melhor se utilizada no Mid ou como suporte!');
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

      case 'Krizzix':

        agent.add('Hm, então quer dizer que resolveu jogar de Krizzix...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(KRIZZIX_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(KRIZZIX_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Krizzix é melhor se utilizado como Suporte!');
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

      case 'Qi':

        agent.add('Hm, então quer dizer que resolveu jogar de Qi...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(QI_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(QI_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('A Qi é melhor se utilizado na Solo!');
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

      case 'Volkath':

        agent.add('Hm, então quer dizer que resolveu jogar de Volkath...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(VOLKATH_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VOLKATH_URL));
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(VOLKATH_JG_URL));
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Volkath é melhor se utilizado na Solo ou na Jungle!');
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
          agent.add('Tenho essa pra jungle');
          agent.add(new Image(WUKONG_URL));
          agent.add('Caso queira jogar na Lane:');
          agent.add(new Image(WUKONG_LANE_URL));
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Solo':
                agent.add('Aqui oh, tenho essa');
                agent.add(new Image(WUKONG_LANE_URL));
            	agent.add('♪ sopa de macaco ♪ sopa sopa de macaco ♪');
                break;
              case 'Jungle':
                agent.add('Por enquanto só tenho essa:');
                agent.add(new Image(WUKONG_URL));
                agent.add('♪ sopa de macaco ♪ sopa sopa de macaco ♪');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Wukong é melhor se utilizado na Jungle ou talvez na Solo!');
            agent.add('♪ sopa de macaco ♪ sopa sopa de macaco ♪');
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

      case 'Zip':

        agent.add('Hm, então quer dizer que resolveu jogar de Zip...');
        if (!filtro.funcao) {
          agent.add('Aqui está:');
          agent.add(new Image(ZIP_URL));
          agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
        } else {
          if (getRole(filtro.funcao).includes(filtro.hero)) {
            switch(filtro.funcao){
              case 'Suporte':
                agent.add('Tenho essa build aqui:');
                agent.add(new Image(ZIP_URL));
                agent.add('Lembrando que fica a sua escolha qual item de SUPORTE usar: Mas se tiver inimigo invisível, o ideal é usar Anel do Amigo.');
                break;
            }
          } else {
            agent.add('Opa, pera ai, '+filtro.funcao+' ?');
            agent.add(FUNCAO_ERRADA_1);
            agent.add(FUNCAO_ERRADA_2);
            agent.add('O Zip é melhor se utilizado como suporte roaming!');
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

    if(filtro.hero){
	    return admin.database().ref('/heroisServico').push({
	    	service: build,
	    	heroi: filtro.hero
	    });
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
      agent.add('Se quiser arcanas “genéricas” para classes de heróis como atirador, assassino, guerreiro, suporte, tanque ou mago, digite:\n\n´arcanas [classe]´\nex: arcanas atirador');
      agent.add('Se quiser saber as arcanas recomendadas para um herói:\n\n´arcanas [herói]´\nex: arcanas violet');
      agent.add("Legenda:\n\nentre [] é obrigatório\nentre () opcional\n\nNão necessário digitar [] ou (), apenas palavras");
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
      agent.add('As arcanas são:\n\nVermelhas: Indomável\nRoxas: Benevolência\nVerdes: Valor');
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
          agent.add('Vermelhas: Indomável\nRoxas: Guerrilha/Tirania\nVerdes: Espeto');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+637 de HP\n+23 de Armadura\n+2.5% de chance de crítico\n+15% de Velocidade de ataque\n+5% de Velocidade de movimento\n+9 de Dano físico\n+64 de Perfuração de armadura');
          break;
        case 'ADC':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Atrocidade\nRoxas: Guerrilha\nVerdes: Espeto');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+16% de chance de crítico\n+10% de Velocidade de ataque\n+10% de Velocidade de movimento\n+9 de Dano físico\n+64 de Perfuração de armadura');
          break;
        case 'ADA':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Massacre\nRoxas: Assassino\nVerdes: Espeto');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+45 de Dano físico\n+100 de Perfuração de armadura\n+10% de Velocidade de movimento');
          break;
        case 'AP':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Violação\nRoxas: Benevolência\nVerdes: Agitar');
          agent.add('Servem para quase todos (80%) os magos do jogo praticamente e são as mais recomendadas entre os Pro Players!');
          agent.add('Se você tiver uma página com 10 de cada o total vai ser:'); 
          agent.add('+42 de Dano mágico\n+88 de Perfuração mágica\n+450 de HP máximo\n+Regeneração de 52 HP a cada 5 segundos\n+4% de Velocidade de movimento\n+6% de Velocidade de ataque');
          break;
        case 'Tank':
          agent.add('As arcanas mais recomendadas para heróis desse tipo são:');
          agent.add('Vermelhas: Indomável\nRoxas: Benevolência\nVerdes: Valor');
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
          agent.add('Vermelhas: Massacre 10x - Lane ou Blitz x10 - Jungler');
          agent.add('Roxas: Assassino 10x - Lane ou Guerrilha x10 - Jungler');
          agent.add('Verdes: Espeto x10');
          break; 

        case 'Aleister':

          agent.add('As arcanas recomendadas para jogar de Aleister são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');
          break;

        case 'Alice':

          agent.add('As arcanas recomendadas para jogar de Alice são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10 ou Guerrilha x5 / Benevolência x5');
          agent.add('Verdes: Valor x10');
          break;

        case 'Amily':

          agent.add('As arcanas recomendadas para jogar de Amily são:');
          agent.add('Vermelhas: Massacre x8 / Atrocidade x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Annette':

          agent.add('As arcanas recomendadas para jogar de Annette são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10 ou Benevolência x5 / Guerrilha x5');
          agent.add('Verdes: Valor x10');
          break;

        case 'Arduin':

          agent.add('As arcanas recomendadas para jogar de Arduin são:');
          agent.add('Vermelhas: Indomável x10 ou Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Arthur':

          agent.add('As arcanas recomendadas para jogar de Arthur são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Espeto x10 ou Valor x10');
          break;

        case 'Arum':

          agent.add('As arcanas recomendadas para jogar de Arum são:'); 
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10 ou Guerrilha x5 / Benevolência x5');
          agent.add('Verdes: Valor x10');
          break;

        case 'Astrid':

          agent.add('As arcanas recomendadas para jogar de Astrid são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Azzenka':

          agent.add('As arcanas recomendadas para jogar de Azzen´ka são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');         
          break;

        case 'Baldum':

          agent.add('As arcanas recomendadas para jogar de Baldum são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Batman':

          agent.add('As arcanas recomendadas para jogar de Batman são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10'); 
          break;

        case 'Brunhilda':

          agent.add('As arcanas recomendadas para jogar de Brunhilda são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;
        
        case 'Butterfly':

          agent.add('As arcanas recomendadas para jogar de Butterfly são:'); 
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10'); 
          break;       

        case 'Capheny':

          agent.add('As arcanas recomendadas para jogar de Capheny são:'); 
          agent.add('Vermelhas: Descontrole x10');
          agent.add('Roxas: Guerrilha x7 / Ladrão x3');
          agent.add('Verdes: Espeto x10');  
          break;

        case 'Chaugnar':

          agent.add('As arcanas recomendadas para jogar de Chaugnar são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Cresht':

          agent.add('As arcanas recomendadas para jogar de Cresht são:'); 
          agent.add('Vermelhas: Massacre x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Espeto x10');  
          break;

        case 'Darcy':

          agent.add('As arcanas recomendadas para jogar de D’Arcy são: ');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Agitar x10'); 
          break;  

        case 'Diaochan':

          agent.add('As arcanas recomendadas para jogar de Diaochan são:'); 
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');         
          break; 

        case 'Elandorr':

          agent.add('As arcanas recomendadas para jogar de Eland´orr são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
        break;

        case 'Elsu':

          agent.add('As arcanas recomendadas para jogar de Elsu são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Enzo':

          agent.add('As arcanas recomendadas para jogar de Enzo são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Ladrão x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break; 

        case 'Errol':

          agent.add('As arcanas recomendadas para jogar de Errol são:');
          agent.add('Vermelhas: Massacre x8 / Atrocidade x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Fennik':

          agent.add('As arcanas recomendadas para jogar de Fennik são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Florentino':

          agent.add('Eita, quer apelar mesmo de Florentino ein?');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Espeto x10');  
          break;


        case 'Gildur':

          agent.add('As arcanas recomendadas para jogar de Gildur são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break; 

        case 'Grakk':

          agent.add('As arcanas recomendadas para jogar de Grakk são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Hayate':

          agent.add('As arcanas recomendadas para jogar de Hayate são:');
          agent.add('Vermelhas: Massacre x4 / Blitz x6');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10'); 
          break;

        case 'Ignis':

          agent.add('As arcanas recomendadas para jogar de Ignis são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Maleficio x10');  
          break;

        case 'Ilumia':

          agent.add('As arcanas recomendadas para jogar de Ilumia são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');         
          break; 

        case 'Ishar':

          agent.add('As arcanas recomendadas para jogar de Ishar são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');        
          break;

        case 'Jinnar':

          agent.add('As arcanas recomendadas para jogar de Jinnar são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break; 

        case 'Kahlii':
 
          agent.add('As arcanas recomendadas para jogar de Kahlii são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;  

        case 'KilGroth':

          agent.add('As arcanas recomendadas para jogar de Kil´Groth são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Kriknak':

          agent.add('As arcanas recomendadas para jogar de Kriknak são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');   
          break;

        case 'Krixi':

          agent.add('As arcanas recomendadas para jogar de Krixi são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;

        case 'Krizzix':

          agent.add('As arcanas recomendadas para jogar de Krizzix são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');        
          break;

        case 'Lauriel':

          agent.add('As arcanas recomendadas para jogar de Lauriel são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Maleficio x10'); 
          break;

        case 'Liliana':

          agent.add('As arcanas recomendadas para jogar de Liliana são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;

        case 'Lindis':

          agent.add('As arcanas recomendadas para jogar de Lindis são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'LuBu':

          agent.add('As arcanas recomendadas para jogar de Lu Bu são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Lumburr':

          agent.add('As arcanas recomendadas para jogar de Lumburr são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Maloch':

          agent.add('As arcanas que eu te recomendo são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Marja':

          agent.add('As arcanas recomendadas para jogar de Marja são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');          
          break;

        case 'Max':

          agent.add('As arcanas recomendadas para jogar de Max são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Mganga':

          agent.add('As arcanas recomendadas para jogar de Mganga são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');
          break;

        case 'Mina':

          agent.add('As arcanas recomendadas para jogar de Mina são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Moren':

          agent.add('As arcanas recomendadas para jogar de Moren são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Murad':

          agent.add('As arcanas recomendadas para jogar de Murad são:');
          agent.add('Vermelhas: Blitz x10');
          agent.add('Roxas: Guerrilha x6 / Ladrão x4');
          agent.add('Verdes: Espeto x10');
          break; 

        case 'Nakroth':

          agent.add('As arcanas recomendadas para jogar de Nakroth são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Guerrilha x5 / Ladrão x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Natalya':

          agent.add('As arcanas recomendadas para jogar de Natalya são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;

        case 'Omega':

          agent.add('As arcanas recomendadas para jogar de Omega são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Ormarr':

          agent.add('As arcanas recomendadas para jogar de Ormarr são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Omen':

          agent.add('As arcanas recomendadas para jogar de Omen são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Peura':

          agent.add('As arcanas recomendadas para jogar de Peura são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Preyta':

          agent.add('As arcanas recomendadas para jogar de Preyta são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;

        case 'Qi':

          agent.add('As arcanas recomendadas para jogar de Qi são:');
          agent.add('Vermelhas: Massacre x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Espeto x10');     
          break;
        
        case 'Quillen':

          agent.add('As arcanas recomendadas para jogar de Quillen são:');
          agent.add('Vermelhas: Descontrole x10');
          agent.add('Roxas: Assassino x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Raz':

          agent.add('As arcanas recomendadas para jogar de Raz são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;

        case 'Riktor':

          agent.add('As arcanas recomendadas para jogar de Riktor são:');
          agent.add('Vermelhas: Massacre x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Rourke':

          agent.add('As arcanas recomendadas para jogar de Rourke são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Roxie':

          agent.add('As arcanas recomendadas para jogar de Roxie são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');
          break;

        case 'Ryoma':

          agent.add('As arcanas recomendadas para jogar de Ryoma são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10'); 
          break;

        case 'Sephera':

          agent.add('As arcanas recomendadas para jogar de Sephera são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Maleficio x10'); 
          break;

        case 'Skud':

          agent.add('As arcanas recomendadas para jogar de Skud são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10'); 
          break;  

        case 'Slimz':

          agent.add('As arcanas recomendadas para jogar de Slimz são:'); 
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Superman':

          agent.add('As arcanas recomendadas para jogar de Superman são:'); 
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Taara':

          agent.add('As arcanas recomendadas para jogar de Taara são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'TeeMee':

          agent.add('As arcanas recomendadas para jogar de TeeMee são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'TelAnnas':

          agent.add('As arcanas recomendadas para jogar de Tel´Annas são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;


        case 'Thane':

          agent.add('As arcanas recomendadas para jogar de Thane são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'TheFlash':

          agent.add('As arcanas recomendadas para jogar de Flash são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;


        case 'TheJoker':

          agent.add('As arcanas recomendadas para jogar de Coringa são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');   
          break;

        case 'Toro':

          agent.add('Infelizmente ele não está em nosso servidor');
          break;

        case 'Tulen':

          agent.add('As arcanas recomendadas para jogar de Tulen são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');
          break;

        case 'Valhein':

          agent.add('As arcanas recomendadas para jogar de Valhein são:');
          agent.add('Vermelhas: Blitz x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Agitar x10');
          break;

        case 'Veera':

          agent.add('Você quis dizer, Valhein AP?');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Agitar x10');     
          break;

        case 'Veres':

          agent.add('As arcanas recomendadas para jogar de Veres são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10'); 
          break;

        case 'Violet':

          agent.add('As arcanas recomendadas para jogar de Violet são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Volkath':

          agent.add('As arcanas recomendadas para jogar de Volkath são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break; 

        case 'Wiro':

          agent.add('As arcanas recomendadas para jogar de Wiro são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Wisp':

          agent.add('As arcanas recomendadas para jogar de Wisp são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Wonder Woman':

          agent.add('As arcanas recomendadas para jogar de Mulher Maravilha são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Wukong':

          agent.add('As arcanas recomendadas para jogar de Wukong são:');
          agent.add('Vermelhas: Atrocidade x10');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Xeniel':

          agent.add('As arcanas recomendadas para jogar de Xeniel são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'YBneth':

          agent.add('As arcanas recomendadas para jogar de Y´bneth são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Yena':

          agent.add('As arcanas recomendadas para jogar de Yena são:');
          agent.add('Vermelhas: Atrocidade x1 / Indomável x9');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Espeto x10');
          break;  

        case 'Yorn':

          agent.add('As arcanas recomendadas para jogar de Yorn são:');
          agent.add('Vermelhas: Atrocidade x8 / Blitz x2');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Zanis':

          agent.add('As arcanas recomendadas para jogar de Zanis são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Zephys':

          agent.add('As arcanas recomendadas para jogar de Zephys são:');
          agent.add('Vermelhas: Atrocidade x2 / Indomável x8');
          agent.add('Roxas: Tirania x5 / Guerrilha x5');
          agent.add('Verdes: Espeto x10');
          break;

        case 'Zill':

          agent.add('As arcanas recomendadas para jogar de Zill são:');
          agent.add('Vermelhas: Violação x10');
          agent.add('Roxas: Guerrilha x10');
          agent.add('Verdes: Agitar x10');
          break;

        case 'Zip':

          agent.add('As arcanas recomendadas para jogar de Zip são:');
          agent.add('Vermelhas: Indomável x10');
          agent.add('Roxas: Benevolência x10');
          agent.add('Verdes: Valor x10');
          break;

        case 'Zuka':

          agent.add('As arcanas recomendadas para jogar de Zuka são:');
          agent.add('Vermelhas: Atrocidade x2 / Massacre x8');
          agent.add('Roxas: Assassino x10');
          agent.add('Verdes: Espeto x10'); 
          break;
      } 
    }

    if(filtro.hero){
	    return admin.database().ref('/heroisServico').push({
	    	service: arcanas,
	    	heroi: filtro.hero
	    });
    }
 }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                 RUNAS                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checarRunas(agent) {

  const runas    = agent.parameters.runas;
  const heroi    = agent.parameters.heroi;
  const sobre    = agent.parameters.Sobre;
  const classes  = agent.parameters.classes;
  const informacao  = agent.parameters.informacao;
  const tipoDano = agent.parameters.tiposDeBuild;

  let filtro = { hero:heroi, classe:classes, tipo:tipoDano, explicar:sobre, info:informacao }; 

  if(runas && !filtro.info && !filtro.explicar && !filtro.hero && !filtro.classe && !filtro.tipo){
    agent.add('Entendi que você quer falar de runas, mas o que exatamente? Se quiser listar meus comandos, basta digitar: runas informações´');
  }

  if(runas && filtro.info){
    agent.add('Para entender melhor sobre runas digite:\n\n´runas explicar´');
    agent.add('Para runas por classes de heróis como atirador, assassino, guerreiro, suporte, tanque ou mago, digite:\n\n´runas [classe]´\nex: runas atirador');
    //agent.add('Se quiser saber as runas recomendadas para um herói:\n\n´runas [herói]´\nex: runas violet');
    agent.add("Legenda:\n\nentre [] é obrigatório\nentre () opcional\n\nNão necessário digitar [] ou (), apenas palavras");
  }

  if(runas && filtro.explicar){
    agent.add('As runas são pedras mágicas! Foram liberadas depois da grande batalha de Volkath! Com as runas, novos elementos de estratégia são adicionados ao jogo.');
    agent.add('Este recurso complementará as novas arcanas. Enquanto arcana dão um atributo adicional ao herói, a runa irá adicionar um bônus à habilidade do herói além de possibilitar jogadas mais agressivas já no início da partida.');
    agent.add('Existem quatro tipos de runas: Lokenheim, Veda, Afata e Liga dos Humanos. Embora cada runa corresponda a uma classe, elas podem ser usadas por todos, e muda de acordo com o estílo de jogo e função de cada herói.');
    agent.add(new Image(RUNAS_URL));
    agent.add('Lokheim (Poder do Abismo): mais indicada para heróis corpo-a-corpo, como guerreiros e assassinos; É a runa Vermelha!');
    agent.add('Veda (Poder da Luz): mais indicada para heróis de ataque à distância, como atiradores e magos; É a runa Amarela!');
    agent.add('Afata (Força da Natureza): mais indicada para suportes e tanques; É a runa Verde!');
    agent.add('Liga dos Humanos (Poder Criativo): gameplay criativo, indicada para qualquer classe; É a runa Azul!');
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
        agent.add('As runas para está classe são dividas em:');
        agent.add('Guerreiros Burst:'); 
        agent.add(new Image(BURST_WARRIOR_URL));
        agent.add('Guerreiros Sustain:'); 
        agent.add(new Image(SUSTAIN_WARRIOR_URL));
        break;
      case 'ADC':
        agent.add('As runas para está classe são dividas em:');
        agent.add('Atiradores Auto Attack:'); 
        agent.add(new Image(AUTOATTACK_ADC_URL));
        agent.add('Atiradores de Longo Alcance:'); 
        agent.add(new Image(LONGRANGED_ADC_URL));
        agent.add('Atiradores dependentes de habilidades:'); 
        agent.add(new Image(SKILLBASED_ADC_URL));
        break;
      case 'ADA':
        agent.add('As runas para está classe são dividas em:');
        agent.add('Assassinos Burst:');
        agent.add(new Image(BURST_ASSASSIN_URL));
        agent.add('Assassino Defensivo:'); 
        agent.add(new Image(SUSTA_ASSASSIN_URL));
        break;
      case 'AP':
        agent.add('As runas para está classe são dividas em:');
        agent.add('Magos Burst:'); 
        agent.add(new Image(BURST_MAGE_URL));
        agent.add('Magos Poke:'); 
        agent.add(new Image(POKE_MAGE_URL));
        break;
      case 'Tank':
        agent.add('As runas para está classe são dividas em:');
        agent.add('Suportes Longo Alcance:');
        agent.add(new Image(SUPORT_LONGRANGE_URL));
        agent.add('Tanks/Suportes Controle:');
        agent.add(new Image(SUPORT_TANK_CC_URL));
        agent.add('Tanks/Suportes TF Focus:');
        agent.add(new Image(SUPORT_TANK_TF_URL));
        break;  
    }
  }

  if(filtro.hero) {
  	switch(filtro.hero) {
      case 'Airi':  
      	agent.add('As runas indicadas para Airi são:');
        agent.add(new Image(AIRI_RUNA_URL));
        break; 

      case 'Aleister':
      	agent.add('As runas indicadas para Aleister são:');
        agent.add(new Image(ALEISTER_RUNA_URL));
        break;

      case 'Alice':
      	agent.add('As runas indicadas para Alice são:');
        agent.add(new Image(ALICE_RUNA_URL));
        break;

      case 'Amily':
      	agent.add('As runas indicadas para Amily são:');
        agent.add(new Image(AMILY_RUNA_URL));
        break;

      case 'Annette':
      	agent.add('As runas indicadas para Annette são:');
        agent.add(new Image(ANNETE_RUNA_URL));
        break;

      case 'Arduin':
      	agent.add('As runas indicadas para Arduin são:');
        agent.add(new Image(ARDUIN_RUNA_URL));
        break;

      case 'Arthur':
      	agent.add('As runas indicadas para Arthur são:');
        agent.add(new Image(ARTHUR_RUNA_URL));
        break;

      case 'Arum':
      	agent.add('As runas indicadas para Arum são:');
        agent.add(new Image(ARUM_RUNA_URL));
        break;

      case 'Astrid':
      	agent.add('As runas indicadas para Astrid são:');
        agent.add(new Image(ASTRID_RUNA_URL));
        break;

      case 'Azzenka':
      	agent.add('As runas indicadas para Azzen´ka são:');
        agent.add(new Image(AZZENKA_RUNA_URL));
        break;

      case 'Baldum':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Batman':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Brunhilda':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;
      
      case 'Butterfly':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;       

      case 'Capheny':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Chaugnar':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Cresht':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Darcy':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;  

      case 'Diaochan':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Elsu':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Enzo':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Errol':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Fennik':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Florentino':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Gildur':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Grakk':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Hayate':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Ignis':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Ilumia':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Ishar':
        agent.add('Te conto assim que ela for lançada, ta?');        
        break;

      case 'Jinnar':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Kahlii':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;  

      case 'KilGroth':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Kriknak':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Krixi':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Lauriel':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Liliana':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Lindis':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'LuBu':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Lumburr':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Maloch':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Marja':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Max':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Mganga':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Mina':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Moren':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Murad':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Nakroth':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Natalya':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Omega':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Ormarr':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Omen':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Peura':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Preyta':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Qi':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;
      
      case 'Quillen':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Raz':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Riktor':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Rourke':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Roxie':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Ryoma':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Sephera':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Skud':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;  

      case 'Slimz':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Superman':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Taara':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'TeeMee':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'TelAnnas':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Thane':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'TheFlash':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'TheJoker':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Toro':
        agent.add('Infelizmente ele não está em nosso servidor');
        break;

      case 'Tulen':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Valhein':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Veera':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');  
        break;

      case 'Veres':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Violet':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Volkath':
        agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break; 

      case 'Wiro':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Wisp':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Wonder Woman':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Wukong':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Xeniel':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'YBneth':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Yena':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;  

      case 'Yorn':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Zanis':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Zephys':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Zill':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;

      case 'Zuka':
      	agent.add('Opa, em breve te digo, pode me cobrar viu?');
        break;
    
    } 
  }  

    if(filtro.hero){
	    return admin.database().ref('/heroisServico').push({
	    	service: runas,
	    	heroi: filtro.hero
	    });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                               COUNTERS                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checarCounters(agent) {

  const counter  = agent.parameters.Counters;
  const heroi    = agent.parameters.herois;
  const informacao  = agent.parameters.informacao;
  const explain  = agent.parameters.Sobre;

  let filtro = { hero:heroi, counterar:counter, info:informacao, explicar:explain }; 

  if(counter && !filtro.explicar && !filtro.info && !filtro.hero ){
    agent.add('Entendi que você precisa de ajuda para lidar com certo herói, mas qual? Se quiser listar meus comandos de counter, basta digitar: counters informações´');
  }

  if(counter && filtro.info){
    agent.add('Para entender melhor sobre Counters digite:\n\n´counters explicar´');
    agent.add('Se quiser saber counters específicos de um herói:\n\n´counters [herói]´\nex: counters violet');
    agent.add("Legenda:\n\nentre [] é obrigatório\nentre () opcional\n\nNão necessário digitar [] ou (), apenas palavras");
  }

  if(counter && filtro.explicar){
    agent.add('Um counter de um herói A é basicamente um herói B que possui mecânicas que são difíceis para o herói A lidar, tornando a lane mais fácil para o herói que posssui essa vantagem natural');
    agent.add('É esse tipo de conceito que permite elevar o nível do competitivo onde é necessário entender a sinergia entre os heróis para formar times fortes e saber counterar aquele pick no momento da Ranked');
    agent.add('Por enquanto, a lista não está completa, mas já é um começo para te ajudar que herói escolher no momento dos picks e bans');
  }

  if(filtro.hero) {
    switch(filtro.hero) {
      case 'Airi':  
        agent.add('Ainda não sei os counters para esse herói');
        break; 

      case 'Aleister':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Alice':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Amily':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Annette':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Arduin':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Arthur':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Arum':
        agent.add('A Arum a véia dos gatos, tem como Counter a maioria dos campeões de longo alcance que mantém distância dela evitando ela curar vida, porém os melhores são:');
        agent.add('Ryoma de um braço só, que com seus pokers consegue manter distância suficiente para não ser surpreendido por uma ultimate no meio da cara\n\nO Valhein famoso Seninha, tem um Kiting com stuns, muito bom pra manter a distância da veia dos gatos\n\nA Alice a Loli, devido o tamanho da área da sua ultimate, quando ela fecha o corta cura ela consegue counterar muito fácil o Regen da Arum.'); 
        agent.add('Resumindo:\n\nBom vs Heróis curto-alcance\n\nRuim vs ADC, Pokes de longo alcance, Corta-cura');
        break;

      case 'Astrid':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Azzenka':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Baldum':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Batman':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Brunhilda':
        agent.add('Ainda não sei os counters para esse herói');  
        break;
      
      case 'Butterfly':
        agent.add('Ainda não sei os counters para esse herói');  
        break;       

      case 'Capheny':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Chaugnar':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Cresht':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Darcy':
        agent.add('O D’Arcy o mago negro só que Azul, tem como counter o Chaugnar pai do Dumbo, que com sua ultimate cancela o re-posicionamento da ultimate do D’Arcy. Você ainda pode usar o purificar no mid e adc, ou braçadeiras purificadas no suporte para da um counter nele.');  
        agent.add('Resumindo:\n\nBom vs Magos de low range (Tulen, Raz)\n\nRuim vs Heróis com alta mobilidade, Chaugnar');
        break;  

      case 'Diaochan':
        agent.add('A famosa mulher do Lubu, tem alguns counters na lane, como a Liliana das 9 rabas que devido aos seus dashs consegue facilmente esquivar do congelamento da coração gelado, podendo usar seus poker pra limpar os minions bem longe e ter um farm safe');
        agent.add('Outro counter é a Kahlii dos 6 braços, que devido ao range muito alto consegue facilmente limpar os minions sem receber o congelamento, e com sua ult consegue manter a coração gelado bem distante do seu time');  
        agent.add('Resumindo:\n\nRuim vs Heróis com alta mobilidade e poke de longo alcance');
        break; 
        
      case 'Elandorr':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Elsu':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Enzo':
        agent.add('Os Counters do Enzo o irmão da Valentina, são o Rourke o woody que usou bomba, devido a não receber CC com sua Ult e ter uma pontencial de troca altíssimo permite segurar a onda do Enzinho');
        agent.add('Outro campeão muito bom contra o Kpop ai, é o Zephis Fi da beba, que devido seu Kit Off Tanker, impede o burst e seu dano é suficiente pra trocar bem contra o Kpop.');  
        agent.add('Resumindo:\n\nBom vs Heróis papel(Atirador jungler)\n\nRuim vs Controle de grupo, heróis tank como Zephys e Rourke');
        break; 

      case 'Errol':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Fennik':
        agent.add('Um dos melhores campeões para Counterar o Fennik é o Valhein cu de pinto, devido o kit off tank, ele consegue não tomar um na boca direto, e o Stun dele pressionam bem o Fennik na fase de rotas.');  
        agent.add('Outro bom counter é a Violet capaz de dar pokes sem necessidade de se aproximar do Fennik, assim como o Hayate boca de fossa, consegue pressionar o Fennik embaixo da torre na fase de rotas, e vocês sabem que rato no bueiro não faz mal pra ninguém.');  
        agent.add('Ah, e eu peço desculpas pelo o meu linguajar, ando assistindo muito as lives do Coach Nnoitra');
        agent.add('Resumindo:\n\nBom vs Melee junglers\n\nRuim vs ADC, Pokes de longo alcance e Controle de Grupo');
        break;

      case 'Florentino':
        agent.add('Florentino o Câncer Metrossexual, tem como counter a Marja boca de pelo, que devido o seu ranger consegue pokear ele a distância, e se ele tocar nela tem a ult pra se re-posicionar e voltar a pokear ele');
        agent.add('Outros dois Counters são o Aliester cópia mal feita do Loki que devido sua ult, o aprisiona enquanto ele é lixado pelo time, seu time. A Arum famosa véia dos gato, também com sua ult, segura o Câncer Metrosexual evitando sua fuga depois do Dive. ');  
        agent.add('Ah, e eu peço desculpas pelo o meu linguajar, ando assistindo muito as lives do Coach Nnoitra');
        agent.add('Resumindo:\n\nBom vs Melee junglers\n\nRuim vs ADC, Marja, Arum, Aleister (controle de grupo)');
        break;

      case 'Gildur':
        agent.add('Ainda não sei os counters para esse herói');  
        break; 

      case 'Grakk':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Hayate':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Ignis':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Ilumia':
        agent.add('Ainda não sei os counters para esse herói');  
        break; 

      case 'Ishar':       
        agent.add('Ainda não sei os counters para esse herói');
        break;

      case 'Jinnar':
        agent.add('Ainda não sei os counters para esse herói');  
        break; 

      case 'Kahlii':
        agent.add('Ainda não sei os counters para esse herói');  
        break;  

      case 'KilGroth':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Kriknak':
        agent.add('A barata de Chernobyl, tem como counters o Aliester copia mal feita do Loki que devido sua ult, o aprisiona enquanto ele é lixado pelo seu time.');
        agent.add('A Arum famosa véia dos gato, também com sua ult, segura o barata de Chernobyl evitando sua fuga depois do Dive. ');  
        agent.add('Resumindo:\n\nBom vs Heróis papeis (Atirador jungler e suporte de peel)\n\nRuim vs Heróis tanks');
        break;

      case 'Krizzix':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Krixi':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Lauriel':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Liliana':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Lindis':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'LuBu':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Lumburr':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Maloch':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Marja':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Max':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Mganga':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Mina':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Moren':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Murad':
        agent.add('Os Counters do Murad Boca de sacola, são o Zephis Fi da Beba que devido seu forte Early Game consegue abusar do invades, além de que o kit off tanker do Zephis ajuda a não ser burstado e ainda vira pra cima do Muradão');
        agent.add('Outros dois Counters são o Aliester cópia mal feita do Loki que devido sua ult, o aprisiona enquanto ele é lixado pelo seu time\n\nE a Arum famosa véia dos gato, também com sua ult prendendo ele, e o time descendo o cacete nele todos juntos');  
        agent.add('Resumindo:\n\nBom vs Heróis papel(Atirador jungler)\n\nRuim vs Controle de grupo, heróis tank como Zephys');
        break; 

      case 'Nakroth':
        agent.add('Resumindo:\n\nBom vs Atirador junglers\n\nRuim vs Burst Junglers(Kriknak, Zanis), Arum, Aleister e Rourke');
        break;

      case 'Natalya':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Omega':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Ormarr':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Omen':
        agent.add('Omen Vara Pal, tem como counters Amily a boneca de pano, devido o kit dela de adicional de dano quando está numa situação 1x1 permite que ela troque com ele na lane, impedindo que ele exerça sua pressão para Split Push.');
        agent.add('Roxie a fogo no rabo, devido seu regen, sustain e dano, consegue limitar a pressão de rota do Omen vara pal na lane.');  
        agent.add('Resumindo:\n\nRuim vs Heróis que possuem bastante sustain');
        break;

      case 'Peura':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Preyta':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Qi':
        agent.add('Ainda não sei os counters para esse herói');  
      break;
      
      case 'Quillen':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Raz':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Riktor':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Rourke':
        agent.add('Resumindo:\n\nBom vs Melee junglers como Murad, Nakroth, Kriknak e Quillen (use-a para counterar esses picks na jungle caso ela esteja forte no meta)\n\nRuim vs Atirador');
        break;

      case 'Roxie':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Ryoma':
        agent.add('Ryoma de um braço só, Tem como Counter todos campeões que conseguem facilmente se aproximar dele, Omen vara pal, a partir do Nv 4, em qualquer descuido do Ryoma de um abraço só, cola ele no postinho e ele vai ver o galo piar.');
        agent.add('Kriknak a barata de Chernobyl também é outro que fecha a distância muito rapidamente e bursta o Ryoma de um abraço só, Antes que ele tente ultar para gerar Sustain');  
        agent.add('Resumindo:\n\nRuim vs Heróis com muita mobilidade e dano burst');
        break;

      case 'Sephera':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Skud':
        agent.add('Ainda não sei os counters para esse herói');  
        break;  

      case 'Slimz':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Superman':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Taara':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'TeeMee':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'TelAnnas':
        agent.add('Tel’Annas a Vegana de Athanor, Tem como Counters diretos o Coringa o que dá psiu pra pata, que devido sua falta de mobilidade fica muito exposta ao combo do coringa pelos flancos');
        agent.add('Campeões como Kriknak a barata de Chernobyl, e Zephis Boca de sacola também são muito fortes devido seu alto potencial de burst e entrada na backline');  
        agent.add('Resumindo:\n\nRuim vs Heróis com muita mobilidade e dano burst');
        break;

      case 'Thane':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'TheFlash':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'TheJoker':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Toro':
        agent.add('Infelizmente ele não está em nosso servidor');  
        break;

      case 'Tulen':
        agent.add('Resumindo:\n\nBom vs Heróis papel(pouca defesa) e de curto alcance\n\nRuim vs Atirador e Mganga');  
        break;

      case 'Valhein':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Veera':  
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Veres':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Violet':
        agent.add('A atiradora quase maga capaz de tirar uma bazuca do… Tem como counter, qualquer composição com mais de 2 Tankers, já que ela não é uma atiradora de DPS e sim poker com crítico, o dano entra muito pouco nos tankers.');
        agent.add('Se o você quer dar um fim da mágica da bazuca, o Zephys fi da beba, tem um kit muito bom pra lidar contra ela, devido ao sustain da passiva, evita tomar ONEHITKILL na boca quando vai correr atrás dela. ');  
        agent.add('E eu peço desculpas pelo o meu linguajar, ando assistindo muito as lives do Coach Nnoitra');
        agent.add('Resumindo:\n\nBom vs Heróis papel(pouca defesa) e de curto alcance\n\nRuim vs Heróis tanks em geral');
        break;

      case 'Volkath':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Wiro':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Wisp':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Wonder Woman':
        agent.add('Resumindo:\n\nBom vs Melee junglers como Murad, Nakroth, Kriknak e Quillen (use-a para counterar esses picks na jungle caso ela esteja forte no meta)\n\nRuim vs Atirador');
        break;

      case 'Wukong':
        agent.add('Resumindo:\n\nBom vs Heróis papel(Atirador jungler)\n\nRuim vs Controle de grupo, heróis tank como Zephys e Rourke');
        break;

      case 'Xeniel':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'YBneth':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Yena':
        agent.add('A joga pedra na Lua, tem como counter o Kil´Groth a lumbriga marinha, devido sua ult que o torna imune a controle de grupo, ele não recebe controle das skill’s da Yena, e seu alto dano faz com ela tenha que jogar na defensiva.');  
        agent.add('Resumindo:\n\nRuim vs Kil´Groth e herói com imunidade a controle de grupo');
        break;  

      case 'Yorn':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Zanis':
        agent.add('Resumindo:\n\nBom vs Heróis papel(e Melee junglers como Murad, Nakroth, Kriknak e Quillen)\n\nRuim vs Atirador junglers, Zephys e Rourke');
        break;

      case 'Zephys':
        agent.add('Resumindo:\n\nBom vs Heróis papel(Atiradores junglers)\n\nRuim vs Lauriel, Rourke e Arum');
        break;

      case 'Zill':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

      case 'Zip':
        agent.add('O famoso rola bosta, tem como counter pessoal a Annette do pirulito de vento, que devido sua ult, consegue barrar o seu potencial de rola rola; evitando aqueles back door chatão que vocês vem na internet. ');  
        agent.add('E eu peço desculpas pelo o meu linguajar, ando assistindo muito as lives do Coach Nnoitra');
        agent.add('Resumindo:\n\nRuim vs Annette');
        break;

      case 'Zuka':
        agent.add('Ainda não sei os counters para esse herói');  
        break;

    }
  } 

  if(filtro.hero){
	    return admin.database().ref('/heroisServico').push({
	    	service: counter,
	    	heroi: filtro.hero
	    });
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
    agent.add('Para dicas sobre algum herói:\n\n´dicas [herói]´\n\nCaso queira dicas rápidas (texto menor):\n\n´dicas rápidas [herói]´');
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

  if(!filtro.papel && filtro.hero) {
    switch(filtro.hero){
      case 'Herói':
        agent.add('Para pedir dicas é preciso informar o nome do herói, por exemplo: dicas violet');
        break;
  
      case 'Airi':

        if(filtro.dica == "rapida"){
          agent.add(new Image(AIRI_DICA_NNOITRA_URL));
          agent.add('A Airi é uma guerreira/assassina, com um split push forte devido sua alta mobilidade, capaz de causar dano explosivo e controle de grupo');
          agent.add('Sua primeira habilidade é seu poke, maximize-a primeiro e aprenda a usar com maestria, o quanto você acerta a shuriken determina quão bom você é com ela');
          agent.add('Combo básico:\n\nS1 -> S2 -> AA -> ULT -> AA -> AA -> S1\n\nO ideal é usar sua shuriken antes de iniciar, pois seu cooldown reduz 1 segundo a cada AA, podendo ser usada mais de uma vez no mesmo combo');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico:\n\nS1 -> S2 -> AA -> ULT -> AA -> AA -> S1\n\nO ideal é usar sua shuriken antes de iniciar, pois seu cooldown reduz 1 segundo a cada AA, podendo ser usada mais de uma vez no mesmo combo');
        }if(filtro.dica == "dicas"){
          agent.add('A Airi é uma guerreira/assassina, com um split push forte devido sua alta mobilidade, capaz de causar dano explosivo e controle de grupo');
          agent.add('Sua primeira habilidade é seu poke, maximize-a primeiro e aprenda a usar com maestria, o quanto você acerta a shuriken determina quão bom você é com ela');
          agent.add('Sempre jogue de forma agressiva e aproveite para pular em cima de atiradores (sua maior prioridade) e outros heróis mais papeis\n\nMas tome cuidado para não ficar sem sua segunda habilidade, quando elas estão em cooldown a Airi fica muito vulnerável, então, nunca gaste ela totalmente para iniciar');
          agent.add('Nunca fique usando sua shuriken por trás dos tanks do seu time para depois tentar atravessar a frontline do time inimigo para ultar\n\nUsar a mobilidade da Airi para contornar da tf e surpreender a backline inimiga é o gank correto, pois assim eles não tem tempo de reagir ou se reposicionar');
          agent.add('Um combo que indico com ela é:\n\nS1 -> S2 -> AA -> ULT -> AA -> AA -> S1\n\nO ideal é usar sua shuriken antes de iniciar, pois seu cooldown reduz 1 segundo a cada AA, podendo ser usada mais de uma vez no mesmo combo');
          agent.add('Lembrando que sua ULT, quanto mais inimigos tiver, maior vai ser o escudo que você ganha! Ah, e o Talento recomendado é Executar');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre a Airi, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Airi, a Kunoichi!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: AIRI_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/lA-p2-hot9o',
	      }));
        }
        break; 

      case 'Aleister':
        
        if(filtro.dica == "rapida"){
          agent.add(new Image(ALEISTER_DICA_NNOITRA_URL));
          agent.add('Aleister é um mago com pouca mobilidade porém possui MUITO controle de grupo, causando slow e stuns que duram tempo suficiente para ajudar seus aliados que precisam chegar mais próximo do inimigo para finalizar');
          agent.add('Sua segunda habilidade é sua maior fonte de dano e consequentemente sua melhor habilidade para limpar waves de minions, maximize-a primeiro');
          agent.add('Combo básico:\n\nS1 -> S2 -> ULT\n\nSe você estiver na moita, é fácil matar qualquer um com esse combo, mas o ideal é ficar usando a primeira e a segunda durante tfs e guardar sempre a ULT para punir erros de posicionamento do time adversário');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico:\n\nS1 -> S2 -> ULT\n\nSe você estiver na moita, é fácil matar qualquer um com esse combo, mas o ideal é ficar usando a primeira e a segunda durante tfs e guardar sempre a ULT para punir erros de posicionamento do time adversário');
        }if(filtro.dica == "dicas"){
          agent.add('Aleister é um mago com pouca mobilidade porém possui MUITO controle de grupo, causando slow e stuns que duram tempo suficiente para ajudar seus aliados que precisam chegar mais próximo do inimigo para finalizar');
          agent.add('Sua segunda habilidade é sua maior fonte de dano e consequentemente sua melhor habilidade para limpar waves de minions, maximize-a primeiro');
          agent.add('Devido seu kit capaz de causar muito dano e controle de grupo, o ideal ao jogar com Aleister é buildar itens que aumente sua velocidade de movimento, pois é extremamente importante a sua participação nas tfs\n\nDevido a grande área que suas habilidades atinge, é fácil limpar waves e rotacionar com ele, foque nisso!');
          agent.add('O combo mais básico e eficiente dele é:\n\nS1 -> S2 -> ULT\n\nSe você estiver na moita, é fácil matar qualquer um com esse combo, mas o ideal é ficar usando a primeira e a segunda durante tfs e guardar sempre a ULT para punir erros de posicionamento do time adversário');
          agent.add('Aproveite do fato que infelizmente muitos se esquecem do dano absurdo que ele causa em quem ficar parado na sua segunda habilidade e use principalmente quando tiver inimigos debaixo da sua torre');
          agent.add('Lembrando que o Aleister tem pouco potencial de finalização e nenhum escape, portanto mantenha sempre uma boa distancia de seus inimigos com suas habilidades criando oportunidades para seu jungle finaliza-los. Ah, e o Talento recomendado é Sprint');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre o Aleister, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Aleister, o Senhor da Trapaça!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ALEISTER_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/dsOkM296xrU',
	      }));
        }
        break;

      case 'Alice':

        if(filtro.dica == "rapida"){
          agent.add(new Image(ALICE_DICA_NNOITRA_URL));
          agent.add('Alice, uma maga/suporte com bastante controle e buffs para seus aliados, possui um dos melhores kits para iniciar ganks e roamings');
          agent.add('Maximize sua primeira habilidade, é sua maior fonte de dano');
          agent.add('Não fique usando sua primeira habilidade sempre que ver um inimigo, use-a para iniciar um gank, um stun ajuda muito um jungler a iniciar');
        }if(filtro.dica == "combo"){
          agent.add('As habilidades do Alice foram feitas para proteger e incomodar os inimigos, portanto não tem um combo básico específico');
        }if(filtro.dica == "dicas"){
          agent.add('Alice, uma maga/suporte com bastante controle e buffs para seus aliados, possui um dos melhores kits para iniciar ganks e roamings');
          agent.add('Maximize sua primeira habilidade, é sua maior fonte de dano');
          agent.add('Entenda uma coisa, a Alice gasta muita mana com suas habilidades, portanto saber usar no momento certo é mais útil do que usar sem parar para limpar waves');
          agent.add('Não fique usando sua primeira habilidade sempre que ver um inimigo, use-a para iniciar um gank, um stun ajuda muito um jungler a iniciar');
          agent.add('Ah e seu escudo (S2) não protege tanto sim, a não ser que você build AP, o que não é muito interessante, use como fosse só um boost na velocidade do seu time\n\nTente usar sempre que tiver certeza de que seu time tiver decidido para onde ir, para não acabar ficando fora de posicionamento, ou quando um aliado sofrer algum slow');
          agent.add('Sua ULT funciona bem com um mago de dano explosivo, pois além de causar slow e silence, aumenta o dano mágico sofrido\n\nMas você pode usar de forma defensiva protegendo seu atirador de dives do jungler inimigo');
          agent.add('A Alice é umas das melhores suportes para rotacionar junto de outro herói, não fique sozinha nunca!');	
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre a Alice, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Alice, a adorável Mística!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ALICE_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/rUB0aMbpIXE',
	      }));
        }
        break;

      case 'Amily':

        if(filtro.dica == "rapida"){
          agent.add(new Image(AMILY_DICA_NNOITRA_URL));
          agent.add('Amily é uma guerreira/tank com habilidades que a tornam quase uma assassina, devido sua excelente mobilidade e passiva que aumenta o dano ao lutar em 1x1');
          agent.add('Maximize sua segunda habilidade, é sua maior fonte de dano');
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT -> AA\n\nCom o slow da sua primeira skill fica fácil pular em cima dos inimigos, principalmente pois além do dano você ganha regen de hp');
        }if(filtro.dica == "combo"){
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT -> AA\n\nCom o slow da sua primeira skill fica fácil pular em cima dos inimigos, principalmente pois além do dano você ganha regen de hp');
        }if(filtro.dica == "dicas"){
          agent.add('Amily é uma guerreira/tank com habilidades que a tornam quase uma assassina, devido sua excelente mobilidade e passiva que aumenta o dano ao lutar em 1x1');
          agent.add('Maximize sua segunda habilidade, é sua maior fonte de dano');
          agent.add('Suas habilidades foram feitas para situações de x1, portanto seu foco é ganks no mid, invades na jungle inimiga e split push, sempre roaming!\n\nPense nela como um herói de sustain, não de dano explosivo');
          agent.add('Evite participar de tfs, sua passiva não funciona nessas situações e ela não é bem uma tank.\n\nMinha dica é, pular na tf após ela ter iniciado apenas para usar sua ULT, e evite ficar nela se estiver enfrentando dano explosivo, é sua maior fraqueza');
          agent.add('Falando em ULT, essa é sua razão para ser forte em split push, capaz de tankar heróis como Omen na ULT por exemplo\n\nAssim como todas suas habilidades ajudam no escape dela');
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT -> AA\n\nCom o slow da sua primeira skill fica fácil pular em cima dos inimigos, principalmente pois além do dano você ganha regen de hp');
          agent.add('Você pode usar tanto Executar, Flick ou Punir como talento, mas te indico Executar');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre a Amily, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Amily, a Esmagadora!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: AMILY_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/mR-7xPX8PUw',
	      }));
        }
        break;

      case 'Annette':

        if(filtro.dica == "rapida"){
          agent.add(new Image(ANNETE_DICA_NNOITRA_URL));
          agent.add('Annette é uma maga/suporte com bastante controle de grupo. Todas suas habilidades causam algum tipo de controle seja slow ou stun.');
          agent.add('Priorize a sua primeira habilidade, é sua maior fonte de dano\n\nJá na segunda habilidade, você precisa mirar de forma que acerte dois inimigos alinhados, para que sejam atordoados');
          agent.add('Use sua ULT sempre que necessário para empurrar heróis melee que tentarem se aproximar de seus aliados\n\nMas tome cuidado para não ajudar seus inimigos afastando eles das habilidades em área de seus aliados');
        }if(filtro.dica == "combo"){
          agent.add('As habilidades da Annette foram feitas para proteger e incomodar os inimigos, portanto não tem um combo básico específico');
        }if(filtro.dica == "dicas"){
          agent.add('Annette é uma maga/suporte com bastante controle de grupo. Todas suas habilidades causam algum tipo de controle seja slow ou stun.');
          agent.add('Priorize a sua primeira habilidade, é sua maior fonte de dano\n\nJá na segunda habilidade, você precisa mirar de forma que acerte dois inimigos alinhados, para que sejam atordoados');
          agent.add('Use sua ULT sempre que necessário para empurrar heróis melee que tentarem se aproximar de seus aliados\n\nMas tome cuidado para não ajudar seus inimigos afastando eles das habilidades em área de seus aliados');
          agent.add('Por ser uma suporte, sua função durante uma partida é Roaming, esteja sempre próximo de seus aliados ganhando visão de mapa. E devido sua composição minha dica é buildar a Annette mais tank');
          agent.add('O talento sugerido para ela é Curar');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre a Annette, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Annette, a Advinha!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ANNETE_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/eNj2qWNjlXE',
	      }));
        }
        break;

      case 'Arduin':

        if(filtro.dica == "rapida"){
          agent.add(new Image(ARDUIN_DICA_NNOITRA_URL));
          agent.add('Arduin é um guerreiro/tank, com um kit forte para iniciar tfs e controlar os inimigos, muito forte na solo lane ou até mesmo como um suporte');
          agent.add('Maximize sua segunda habilidade se estiver na solo, ou a primeira caso esteja como suporte');
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> S1 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> S1 -> AA');
          agent.add('Lembrando que você é um tank, não tente pular sozinho numa tf, você precisa ter seu time junto!');
        }if(filtro.dica == "combo"){
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> S1 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> S1 -> AA');
        }if(filtro.dica == "dicas"){
          agent.add('Arduin é um guerreiro/tank, com um kit forte para iniciar tfs e controlar os inimigos, muito forte na solo lane ou até mesmo como um suporte');
          agent.add('Maximize sua segunda habilidade se estiver na solo, ou a primeira caso esteja como suporte');
          agent.add('Não tenha medo de usar sua ULT, tem um cooldown curto, use para se aproximar de seus inimigos');
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> S1 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> S1 -> AA');
          agent.add('Lembrando que você é um tank, não tente pular sozinho numa tf, você precisa ter seu time junto!');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre o Arduin, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Arduin, o Espírito!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ARDUIN_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/tZGaOoYGjd8',
	      }));
        }
        break;
 	 	
      case 'Arthur':

        if(filtro.dica == "rapida"){
          agent.add(new Image(ARTHUR_DICA_NNOITRA_URL));
          agent.add('Arthur é um guerreiro/tank, capaz de aguentar e causar muito dano sem depender de mana para isso');
          agent.add('Maximize sua primeira habilidade primeiro, mas no inicio do jogo upa primeiro sua segunda habilidade pois ela é mais útil nas tfs lvl 1 e ajuda na primeira wave clear');
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> AA');
        }if(filtro.dica == "combo"){
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> AA');
        }if(filtro.dica == "dicas"){
          agent.add('Arthur é um guerreiro/tank, capaz de aguentar e causar muito dano sem depender de mana para isso');
          agent.add('Maximize sua primeira habilidade primeiro, mas no inicio do jogo upa primeiro sua segunda habilidade pois ela é mais útil nas tfs lvl 1 e ajuda na primeira wave clear');
          agent.add('Inicie tfs usando sua primeira para colocar uma marca no inimigo e causar dano adicional, use sua segunda quando já estiver próximo dos inimigos');
          agent.add('Quando estiver com sua ULT, foque usar sempre no mago ou no atirador inimigo, o combo com a ULT é forte o suficiente para matar esses heróis sem defesa.');
          agent.add('Seu combo normal é:\n\nS1 -> S2 -> AA\n\nCombo completo:\n\nS1 -> ULT -> S2 -> AA');
          agent.add('Lembrando que sua passiva faz o Arthur ser um tank natural contra heróis de dano físico, porém ele é muito dependente de sua build e arcanas, saiba buildar corretamente');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre o Arthur, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Arthur, o Preferido!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ARTHUR_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/pSiE9U6ctZU',
	      }));
        }
        break;

      case 'Arum':

        if(filtro.dica == "rapida"){
          agent.add(new Image(ARUM_DICA_NNOITRA_URL));
          agent.add('Arum é um tank com caracteristicas de um mago, capaz de aguentar muito dano enquanto se cura com seus leões');
          agent.add('Maximize primeiro sua primeira habilidade, e sempre use-a antes de sair da base para economizar mana e stackar os três leões');
          agent.add('Arum é uma dos tanks mais fortes no lvl 1, com seus leões ela consegue ganhar fácil situações 1v2, portanto, dar invades é essencial, avise seu time');
        }if(filtro.dica == "combo"){
          agent.add('A Arum não possui combo específico, portanto o ideal é entender que você não deve lutar sem seus três leões, e por favor use sua ULT quando tiver certeza de que vai sofrer dano ou que tem alguém ao lado para matar');
        }if(filtro.dica == "dicas"){
          agent.add('Arum é um tank com caracteristicas de um mago, capaz de aguentar muito dano enquanto se cura com seus leões');
          agent.add('Maximize primeiro sua primeira habilidade, e sempre use-a antes de sair da base para economizar mana e stackar os três leões');
          agent.add('Arum é uma dos tanks mais fortes no lvl 1, com seus leões ela consegue ganhar fácil situações 1v2, portanto, dar invades é essencial, avise seu time');
          agent.add('Use sua ULT de forma inteligente, focando sempre heróis que dão muito trabalho, como assassinos e atiradores\n\nUsar sua ULT debaixo da torre inimiga é uma ótima forma de matar qualquer inimigo, seu kit te permite fazer isso com maestria');
          agent.add('Sua segunda habilidade é melhor quando utilizada focando inimigos mais distantes, além de que é sempre bom usar antes de ultar pois sua ULT ativa os três leões');
          agent.add('Te recomendo usar flick, cura ou desativar torres como talento\n\nEsse último é o melhor quando estiver na solo e quer garantir o kill com um dive na torre. Após matar o inimigo com seu ULT, use para escapar sem problemas');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre a Arum, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Arum, a Conjuradora!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ARUM_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/_9W-VYFs2Fg',
	      }));
        }
        break;

      case 'Astrid':

        if(filtro.dica == "rapida"){
          agent.add(new Image(ASTRID_DICA_NNOITRA_URL));
          agent.add('Astrid é uma Guerreira que tem potencial pra rasgar seus inimigos. Seu kit permite ela tanto absorver quanto distribuir dano, devido sua passiva e ult');
          agent.add('Maximize sua primeira habilidade, é a skill necessária para Clear Wave e trocações na lane devido ao buff na velocidade de ataque');
          agent.add('Seu combo é: S2 -> AA -> S1 -> AA -> AA -> AA; Repita até atingir o limite de HP (60%) para usar sua ULT\n\nO Slow da segunda Skill vai permitir que os carrys menos movéis não fujam, e os carrys mais móveis tenham dificuldade em escapar');
        }if(filtro.dica == "combo"){
          agent.add('Seu combo é: S2 -> AA -> S1 -> AA -> AA -> AA; Repita até atingir o limite de HP (60%) para usar sua ULT\n\nO Slow da segunda Skill vai permitir que os carrys menos movéis não fujam, e os carrys mais móveis tenham dificuldade em escapar.');
        }if(filtro.dica == "dicas"){
          agent.add('Astrid é uma Guerreira que tem potencial pra rasgar seus inimigos. Seu kit permite ela tanto absorver quanto distribuir dano, devido sua passiva e ult');
          agent.add('Maximize sua primeira habilidade, é a skill necessária para Clear Wave e trocações na lane devido ao buff na velocidade de ataque');
          agent.add('Suas habilidades foram feitas para situações de Dive, portanto seu foco é Tf’s e derrubada de torres\n\nUtilize a ULT para ganhar a invencibilidade, tankar o dano inicial da torre e finalizar todos seus adversários que estiverem debaixo dela');
          agent.add('Para TF’s minha dica é força os flancos, buscando sempre os Carrys com sua segunda habilidade ativará um “círculo” para sua estocada que lhe colocará cara a cara o carry a partir daí é infringir o máximo de dano que conseguir\n\nAntes de usar sua ULT verifique seu HP e do adversário. Se ele estiver com menos 60% você dará um dano Real Extra, e se você tiver com menos de 60% você dará stun no adversário, então não se afobe a usar a ult.');
          agent.add('Seu combo é: S2 -> AA -> S1 -> AA -> AA -> AA; Repita até atingir o limite de HP (60%) para usar sua ULT\n\nO Slow da segunda Skill vai permitir que os carrys menos movéis não fujam, e os carrys mais móveis tenham dificuldade em escapar');
          agent.add('Lembre que se o adversário estiver muito próximo da sua Ult você não dará dano, mantenha a distância necessária')
      	  agent.add('Caso queira entender melhor e precisa de um guia completo sobre a Astrid, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Astrid, a Indomável!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: ASTRID_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/Xs8zQ-0VDhE',
	      }));
        }
        break;

      case 'Azzenka':

        if(filtro.dica == "rapida"){
          agent.add(new Image(AZZENKA_DICA_NNOITRA_URL));
          agent.add('O Azzen´ka é um dos magos com o maior controle em área do jogo, capaz de causar muito dano, porém, tem uma das piores mobilidades');
          agent.add('Sua segunda habilidade é sua maior fonte de dano, é sempre bom começar upando ela');
          agent.add('O ideal é ficar dando poke de longe com a primeira e a segunda, sempre na backline\n\nE tenha cuidado com sua ULT, apesar de muito forte, se usada de forma errada pode não causar dano em ninguém já que ela explode no primeiro inimigo que atingir, podendo esse ser apenas um minion');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('O Azzen´ka é um dos magos com o maior controle em área do jogo, capaz de causar muito dano, porém, tem uma das piores mobilidades');
          agent.add('Sua segunda habilidade é sua maior fonte de dano, é sempre bom começar upando ela');
          agent.add('Jogue com ele de forma recuada, sempre preocupado com seu posicionamento, pois você não possui nenhuma habilidade de escape');
          agent.add('O ideal é ficar dando poke de longe com a primeira e a segunda, sempre na backline\n\nE tenha cuidado com sua ULT, apesar de muito forte, se usada de forma errada pode não causar dano em ninguém já que ela explode no primeiro inimigo que atingir, podendo esse ser apenas um minion');
          agent.add('Minha dica é, usar com sabedoria sua segunda skill, se ver dois inimigos lado a lado, esse é o momento certo, ela vai rebater nos 2 o suficiente para petrifica-los');
          agent.add('Caso queira entender melhor e precisa de um guia completo sobre o Azzen´ka, confere aqui esse Guia do Nnoitra:');
          agent.add(new Card({
	        title: 'Guia - Azzen´ka, o Esquecido!',
	        text: 'Guia de heróis de A a Z! - Coach Nnoitra\nO melhor conteúdo avançado de AoV',
	        imageUrl: AZZENKA_GUIA_NNOITRA_URL,
	        buttonText: 'Assistir',
	        buttonUrl: 'https://youtu.be/LCxAWUlB-pw',
	      }));
        }
        break;

      case 'Baldum':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Batman':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Brunhilda':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Brunhilda é uma atiradora com um kit bem equilibrado, especializada em cercar e defender, já que com sua ULT, uma equipe adversária de curto alcance sofre pra conseguir se aproximar');
          agent.add('Maximize sua segunda habilidade primeiro, é o que te da sustain para agressivar durante o early game, apesar dela só causar estragos mesmo da metade para o fim da partida');
          agent.add('Sua passiva permite causar bastante dano crítico caso tenha as arcanas certas, cada AA aumenta a taxa de acertar um crítico');
          agent.add('Use sua segunda habilidade explode assim que entra em contato com o inimigo, causando dano, slow e reduzindo armadura.\n\nEssas armadilhas podem ser vistas no matinho, então coloque sempre no caminho do inimigo, ou forçando eles de mudar de rota');
          agent.add('Sobre sua ULT, é perfeita para cercar inimigos, além de funcionar em torres, pode inclusive usar o Flick enquanto usa ela para aumentar o alcance\n\nCuidado apenas com posicionamento, você fica imóvel enquanto ulta, um alvo fácil para puxões do Grakk por exemplo');
          agent.add('Apesar de fácil de jogar ela é melhor se utilizada em uma composição que tenham heróis que possam dar dive, portanto evite jogar com ela caso tenha uma Kahlii ou uma Ilumia por exemplo');
        }
        break;

      case 'Butterfly':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Olha, não acredito que tenha um combo específico, BF é só apertar todas as skills perto do inimigo');
        }if(filtro.dica == "dicas"){
          agent.add('A Butterfly é uma assassina capaz de virar tfs ao seu favor, devido sua passiva de resetar habilidades após um abate tendo sempre sua ult disponível');
          agent.add('Já que não gasta mana, você pode usar sua primeira habilidade sempre para se movimentar mais rápido pelo mapa');
          agent.add('Ao jogar de BF, você precisa entender que um assassino é focado em finalizações, ou seja, você não deve iniciar tfs, você deve chegar para finalizar quem já ta quase morto');
          agent.add('O ideal é sempre rotacionar de forma que surpreenda, antecipando rotações e pegando justamente aquele atirador ou mago que chegou tarde para batalha, seu foco inicial são eles');
          agent.add('Saber focar o herói inimigo certo vai te ajudar a decidir qual o melhor momento de pular no meio de uma tf, e por favor, não foca o tank!');
        }
        break;       

      case 'Capheny':
        
        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico:\n\nS1 -> AA -> S2 -> AA -> S1 -> AA -> AA -> AA...');
        }if(filtro.dica == "dicas"){  
          agent.add('A Capheny é uma atiradora, focada no auto attack, capaz de causar muito dano em torres com seu laser');
          agent.add('E te digo, o laser é só um detalhe, o forte dela é o auto attack.\n\nTenta sempre se movimentar enquanto atacar pra tirar o melhor dela, posicionamento com a Capheny é TUDO!');
          agent.add('O combo mais eficiente para ela é:\n\nS1 -> AA -> S2 -> AA -> S1 -> AA -> AA -> AA...');
          agent.add('Lembrando que a passiva dela é a cada 1% de velocidade de ataque = 2 de dano e o limite máximo de velocidade de ataque é 200%');
        }          
        break;

      case 'Chaugnar':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('O combo do Chaugnar é: S1 -> AA -> S2 -> ULT -> S2 -> AA');
        }if(filtro.dica == "dicas"){
          agent.add('O Chaugnar é um suporte/tank com um kit perfeito para counterar controle de grupos e proteger seu time');
          agent.add('Inicie upando sua primeira habilidade e depois maximize a segunda.\nAh e sempre use a segunda antes de usar a ULT, pois ela reseta após usar');
          agent.add('Sua primeira skill é muito boa para roubar pássaros e também te deixa imune a controle de grupo\n\n Use para prever o ataque do Grakk ou do Ryoma e proteger seus amigos');
          agent.add('Lembre-se que apesar de ter imunidade ao controle de grupo, você ainda sofre dano, portanto tome cuidado ao iniciar tfs');
          agent.add('Seu combo é: S1 -> AA -> S2 -> ULT -> S2 -> AA');
          agent.add('Seu foco é proteger seu time usando usa ULT no momento que o time adversário usa habilidades de controle de grupo');
          agent.add('Com sua ULT você dá redução de dano para o seu time, da imunidade a controle e diminui o cooldownr\n\nE tbm retira o custo de mana da S2 por 6 segundos, com 40% de CDR o cooldown dela fica 0,6 segundos');
        }
        break;

      case 'Cresht':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        } 
        break;

      case 'Darcy':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Seu combo é:\n\nS1 -> AA -> ULT -> S2 -> ULT -> S1 -> AA -> S2 ');
        }if(filtro.dica == "dicas"){
          agent.add('D’Arcy é um mago burst, capaz de causar muito dano explosivo além de ter sustain e cura com seu kit');
          agent.add('Maximize primeiro sua primeira habilidade, é sua maior fonte de dano e cura(quando está fortificada)');
          agent.add('Sua primeira habilidade aumenta o próximo auto ataque do D’Arcy, útil principalmente em torres\n\nAlém disso, sua ULT pode ser combada com sua segunda, use a segunda 0.5 segundos após usar a ULT para acertar os inimigos');
          agent.add('Seu combo é:\n\nS1 -> AA -> ULT -> S2 -> ULT -> S1 -> AA -> S2 ');
          agent.add('Use sua primeira habilidade de forma defensiva e para dar pokes.\n\nMinha dica é, aprenda a usar ele na jungle, pois assim ele escala seu poder muito mais rápido e seu poke faz o time inimigo querer desinstalar o jogo');
          
        }
        break;  

      case 'Diaochan':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        } 
        break; 

      case 'Elandorr':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        } 
        break;

      case 'Elsu':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Elsu é um atirador/assassino capaz de causar muito dano a uma longa distância, além de possuir um kit com habilidades de visão');
          agent.add('Maximize seu tiro, sua segunda habilidade é o seu maior poke, capaz de causar muito dano desde o early');
          agent.add('Um bom Elsu é capaz de acertar seus tiros da segunda habilidade, no momento certo, pois sabe a diferença entre o momento que você deve usar AA e o momento que se usa a habilidade\n\nPor exemplo, durante uma tf é importante que o Elsu use AA, somente nos momentos antes e pós tf que se usa o tiro sniper, pois a chance de acertar no alvo durante uma tf é muito pequena');
          agent.add('Lembrando que a passiva de sua primeira habilidade é o que faz o AA do Elsu tão poderoso. Se usado junto do stack e uma Murasama, ele vai ter 100% de perfuração de armadura\n\nEm outras palavras, o AA causa dano puro. Portanto, posicionamento correto numa tf é a chave para a vitória com ele');
          agent.add('Sua ULT apesar de causar bastante dano é usada principalmente como uma forma de reposionamento, ou até mesmo de escape, caso algum assassino pule em cima de você\n\nEla não possui o mesmo delay que a sniper tem ao ser utilizada, podendo ser usada no mesmo momento para te salvar, portanto evite usar de forma agressiva para não ficar sem');
          agent.add('Minha principal dica é, coloque suas armadilhas em lugares que te permita segurança de possíveis ganks, como a moita próximo do rio por exemplo e durante tfs sempre AA, é sua maior fonte de dano\n\nAh, sua visão também revela inimigos invisíveis! Não esqueça disso!');
        }
        break;  
      
      case 'Enzo':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Seus combos são:\n\nS2 -> S1 -> S2 -> ULT -> AA -> ULT\n\nS2 -> ULT -> S2 -> ULT');
        }if(filtro.dica == "dicas"){
          agent.add('Enzo é um assassino jungler, com bastante mobilidade, controle de grupo e potencial de gank');
          agent.add('Maximize sua segunda habilidade, ela causa controle de grupo ao arremessar um inimigo para trás');
          agent.add('Sua primeira habilidade é um dash parecido com o do Hayate, capaz de trazer para perto inimigo que estiverem presos pela segunda habilidade\n\nImportante seu uso durante o combo para garantir que o inimigo fique dentro da zona de arremesso do gancho');
          agent.add('Seu gancho é carregavel, quanto mais tempo carregar (limite de 4 segundos) mais longe vai, pode e deve ser usado enquanto anda, sempre carregado antes de iniciar tfs\n\nMinha dica é, tente capturar inimigos individualmente e puxe eles para seu time, focando principalmente mago e ADC');
          agent.add('Após prender um inimigo com seu gancho, sua ULT te leva até o inimigo e causa dano a ele e a todos os inimigos no caminho\n\nTente sempre combar com o Enzo, e evite pular no meio de tfs, seu papel é finalizar inimigos sozinhos, e sempre alternar suas habilidades com AA, pois sua passiva faz sua velocidade aumentar');
          agent.add('Seus combos são:\n\nS2 -> S1 -> S2 -> ULT -> AA -> ULT\n\nS2 -> ULT -> S2 -> ULT');
          agent.add('Caso erre seu gancho te recomendo evitar tfs, pois sem ter um inimigo preso o Enzo fica vulnerável, pois ele é apenas um assassino\n\nLembrando que o Enzo possui uma das maiores dificuldades de maestria, portanto treine bastante antes de ir rankeds com ele');
        }
        break;
        
      case 'Errol':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Fennik':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Florentino':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Gildur':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Grakk':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Hayate':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ignis':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ilumia':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Ishar':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Jinnar':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Kahlii':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;  

      case 'KilGroth':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Kriknak':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Krixi':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Krizzix':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        } 
        break;

      case 'Lauriel':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Liliana':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Lindis':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'LuBu':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Lumburr':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Maloch':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Marja':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Max':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('As habilidades do Max foram feitas para situações específicas, portanto não existe um combo específico para ele\n\nMinha dica é, não use sua ult para tentar matar aquele inimigo que escapou com pouco hp, use nas tfs para afastar ou retirar atiradores e assassinos da batalha');  
        }if(filtro.dica == "dicas"){
          agent.add('O Max é um guerreiro muito forte capaz de mudar o resultado de tfs se souber usar sua ult global no momento certo');
          agent.add('Tenha em mente duas coisas: O Max não é um tank e seu foco é ultar no atirador ou no assassino inimigo, retirando/afastando eles das tfs');
          agent.add('Ao jogar de Max, é importante que você tenha uma boa noção de mapa, pois sua ult apesar de ter longo tempo de recarga ajuda a informar o posicionamento do time inimigo');
          agent.add('O ideal é evitar de usar sua ult a longa distancia, pois dependendo da distância, o inimigo pode voltar base antes de você chegar ou o time inimigo pode estar só esperando você chegar para te atacar');
          agent.add('Use sua segunda skill para cancelar habilidades dos inimigos, não use somente para causar dano.\n\nE lembre-se, nem sempre vale a pena usar sua ult para tentar matar aquele inimigo que fugiu com pouco hp, a prioridade é usar sua ult para ajudar nas tfs que já estão rolando');
        }
        break;

      case 'Mganga':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Mina':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Moren':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Murad':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break; 

      case 'Nakroth':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Natalya':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Omega':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ormarr':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Omen':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Acredito que o Omen não tem nenhum combo específico pois seu dano vem básicamente de ataques normais, minha dica é stackar passiva dele nos minions ou no pássaro antes de atacar algum inimigo.');
        }if(filtro.dica == "dicas"){
          agent.add('Omen é um guerreiro com um sustain muito forte, capaz de ganhar partidas somente focando no split push');
          agent.add('Ele é um dos melhores heróis para trocações 1x1, porém é importante entender contra quem ele está lutando para saber usar corretamente suas habilidades ao seu favor');
          agent.add('Maximize sua segunda habilidade, é o que torna o Omen quase um tank capaz de duelar bem contra qualquer herói');
          agent.add('Use sua primeira para atrair e agrupar inimigos. Dessa forma ao ativar sua passiva, ele vai causar dano em todos\n\nE é devido a isso que torna o Omen um dos melhores split pushers, seu wave clear é muito rápido');
          agent.add('Sua ULT deve ser usada em atiradores, magos ou assassinos. Tente flanquear e atacar a backline sempre que for querer ajudar numa TF\n\nMas seu foco mesmo é torres, sempre tente chamar atenção oposta ao lado da TF');
          agent.add('O talento recomendado é flick, você pode usar para combar com seu ULT, ou como escape. Mas também pode usar executar.');
        }
        break;

      case 'Peura':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Preyta':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Qi':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('O combo básico da Qi é:\n\nS1 -> S3 (focar jogar inimigo numa parede) -> S2 -> S3');
        }if(filtro.dica == "dicas"){
          agent.add('Qi é uma guerreira/tank, muito parecida com uma Airi, ou Zuka na Solo lane, com um bom kit de controle mas com um pouco mais de mecânica devido sua ULT');
          agent.add('Comece upando sua primeira skill, e depois maximize a segunda, é sua maior fonte de dano');
          agent.add('Sempre que acertar uma habilidade no inimigo, Qi ganha armadura, e dá dois ataques normais mais rápidos, dano extra e recupera HP\n\nO que a torna uma guerreira com um ótimo sustain, mas precisa de uma build certa');
          agent.add('Sua primeira habilidade é um dash que arremessa pra cima o inimigo causando dano e imobilizando por 0,5 segundos, use-a para iniciar seu combo\n\nSua segunda habilidade causa dano por segundo e reduz em 20 a armadura do inimigo até 5 stacks (100, praticamente uma Rompe Fileira no lvl 1)');
          agent.add('Sua ULT empurra os inimigos para frente, se eles batem numa parede recebem um dano extra, ficam stunnados por 1,5 segundos, e sua ULT pode ser usada novamente e causa dano baseado na % de vida perdida do inimigo');
          agent.add('Seu combo básico é:\n\nS1 -> S3 (focar jogar inimigo numa parede) -> S2 -> S3');
          agent.add('A Qi é uma guerreira que consegue acabar rapidamente com magos e atiradores, seu foco deve ser esses heróis, por isso builds full AD nela sejam populares\n\nMas caso esteja aprendendo, builds equilibradas com dano e armadura vão ser melhores');
        }
        break;  
      
      case 'Quillen':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico com o Quillen é:\n\nULT -> S2 -> S1 -> AA -> ULT -> S2 -> S1 -> AA -> ULT...\n\nO Quillen é um assassino feito para situações 1x1, portanto seu foco é sempre atacar heróis que estiverem mal posicionados, fora das tfs, focando sempre no mago e no atirador!');  
        }if(filtro.dica == "dicas"){
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

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Riktor':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Seu combo comum é:\n\nS1 -> AA -> S1 -> AA -> S2\nDeve ser iniciado de dentro da moita, para finalizar inimigos basta usar a ULT antes de iniciar o combo');
        }if(filtro.dica == "dicas"){
          agent.add('Riktor é um guerreiro/assassino capaz de se adaptar ao terreno para mudar suas habilidades, com muita mobilidade, controle de grupo além de causar dano puro com sua ULT');
          agent.add('Maximize sua primeira habilidade, é sua maior fonte de dano além da ULT, inclusive evite lutar sem ter essa habilidade disponível');
          agent.add('Para jogar de Riktor você deve entender que o matinho é seu melhor amigo, dessa forma é possível usar suas habilidades duas vezes devido ao stack da passiva\n\nSua primeira reseta o cooldown ao acertar um inimigo, sempre use AA após usar essa habilidade, e não use a habilidade assim que for resetada, você pode precisar usar para fugir');
          agent.add('Salve sua segunda para os momentos que você for dar dive ou estiver sendo atacado, principalmente para evitar controle de grupo dos inimigos\n\nua ULT deve ser usada perto de um inimigo e precisa de stack para ativar o dano puro, portanto calcule bem a distância para não ultar no nada');
          agent.add('Seu combo comum é:\n\nS1 -> AA -> S1 -> AA -> S2\nDeve ser iniciado de dentro da moita, para finalizar inimigos basta usar a ULT antes de iniciar o combo');
          agent.add('Apesar de ser um guerreiro, o Riktor é muito papel, portanto o ideal é entender o timing de suas habilidades para poder buildar ele full AD (ideal) e causar o máximo possível de dano nos inimigos papeis');
        }
        break;

      case 'Rourke':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Roxie':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Ryoma':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Sephera':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Skud':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico com o Skud é:\n\nS2 -> Aguarda a contagem de 5 segundos -> S1 -> AA -> ULT -> S1\n\nO Skud foi feito para causar dano explosivo e bater em retirada, acerte seu soco carregado e use a ULT para resetar a primeira skill e conseguir fugir');  
        }if(filtro.dica == "dicas"){
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

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo específico para ele :(');
        }if(filtro.dica == "dicas"){
          agent.add('O Slimz é um atirador, com um dos mais demorados stuns do jogo e apesar de ter um early ruim, seu dano no late game derrete os tanks');
          agent.add('Maximize primeiro a habilidade da lança, é sua habilidade mais forte');
          agent.add('Sua segunda habilidade é seu melhor escape, melhor se utilizada para atravessar paredes\n\nEvite de usar para perseguir um inimigo, ao menos que tenha 95% de certeza que vale a pena, do contrário o Slimz se torna um alvo fácil');
          agent.add('Sua ULT e sua passiva tornam o Slimz muito forte contra tanks, mas precisa ter um bom posicionamento para evitar complicações\n\nInclusive, você pode usar sua lança em um alvo qualquer apenas para ativar a passiva e aumentar a velocidade de movimento');
          agent.add('Durante o inicio do jogo, jogue de forma passiva, o ideal é sempre ter um suporte com controle de grupo ao lado para facilitar de acertar a lança, que quanto mais longe está o alvo, mais tempo esse permanesse stunnado');
          agent.add('O ideal é só partir pra cima depois de garantir que acertou a lança, pois te garante certeza do kill');
        }
        break;

      case 'Superman':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Os combos para o Superman são vários:\n\n ULT(voando) -> S2(andando) -> faz um meio circulo -> AA e repete, meio-circulo -> AA (pode ser feito até 7 vezes)');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Taara':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'TeeMee':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'TelAnnas':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;


      case 'Thane':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('As habilidades do Thane foram feitas para proteger e incomodar os inimigos, portanto não tem um combo básico específico');  
        }if(filtro.dica == "dicas"){
          agent.add('Thane é um tanque/suporte com muito controle de grupo, capaz de aguentar muito dano e causar bastante estrago com sua ULT');
          agent.add('Nunca inicie uma tf usando de cara todas as suas habilidades, sua função é estar próximo das tfs de olho nos possíveis ganks do jungle ao seu adc/mago');
          agent.add('Use suas habilidades nesses momentos, sempre focado em proteger seu atirador ou mago, seja empurrando os inimigos ou atordoando');
          agent.add('Sua ULT causa dano real, ou seja, ignora armadura e atinge em cheio na vida do inimigo, use com cuidado para não roubar kills, mas caso aconteça, é a vida');
          agent.add('O importante é ajudar a matar, enquanto seu foco principal é proteger!');
        }
        break;

      case 'TheFlash':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;


      case 'TheJoker':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Toro':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Tulen':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico com Tulen é:\n\nS1 -> S2 -> AA -> ULT\n\nAcertando a primeira e a segunda skill corretamente, sua passiva já vai estar ativa, só restando a ULT para finalizar o inimigo');  
        }if(filtro.dica == "dicas"){
          agent.add('Tulen é um mago de alta mobilidade, com bastante dano explosivo e grande poder de finalização de seus inimigos com sua ULT');
          agent.add('Comece o jogo upando sua segunda skill, pois isso te ajuda em possíveis ganks no early game e maximize a primeira skill, é sua maior fonte de dano além da passiva');
          agent.add('Apesar de acertar a longa distancia, as skills do Tulen foram feitas para ser usadas o mais próximo possível do inimigo');
          agent.add('Acertando corretamente os 3 raios da primeira skill e acertando a segunda skill no momento da partida e da chegada, você garante os 5 stacks necessários para ativar a passiva');
          agent.add('Seu combo básico é:\n\nS1 -> S2 -> AA -> ULT\n\nMinha dica é, utilize a primeira skill nos minions, é mais fácil de acertar os 3 raios para pelo menos acumular stack antes da tf, mas não entre nela sem stacks da segunda habilidade.');
          agent.add('Lembrando que é importante que sua ULT mate o alvo, pois além de ativar a passiva novamente seu cooldown é reduzido podendo ser usada novamente em poucos segundos em outro inimigo');
        }
        break;

      case 'Valhein':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Veera':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Veres':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não existe um combo específico, o ideal é saber stackar a passiva antes de pular numa tf, além de entender o range único de cada habilidade');
        }if(filtro.dica == "dicas"){
          agent.add('A Veres é uma assassina burst, capaz de causar muito dano explosivo e dano puro através de sua passiva');
          agent.add('Priorize sua primeira habilidade, é sua habilidade de maior de dano, e cada herói que você atinge usando ela é um stack de sua passiva');
          agent.add('Entenda que para dominar a Veres você precisa se familiarizar com o range das suas habilidades\n\nCada uma possui um range específico, principalmente sua passiva que precisa acertar na distancia certa para causar o dano correto');
          agent.add('Sua segunda skill empura inimigos próximos e puxa inimigos que estão mais distantes, e sua ULT e passiva foram feitas para finalizar quem estiver com pouco HP\n\nQuanto menos HP tem o inimigo, mais forte é o dano da Veres, portanto saiba o momento certo de entrar numa TF e nunca inicie uma');
          agent.add('Devido suas habilidades causarem dano real é importante usar seu stack ao seu favor, sempre entrando e saindo da tf usando sua passiva onde tiver mais inimigos próximos\n\nFoca a backline!');
        }
        break;

      case 'Violet':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico com a Violet é:\n\nS1 -> AA -> ULT\n\nA Violet foi feita para dar poke nos inimigos com sua bazooka, mantendo sempre a distância para aproveitar o range de sua habilidade');  
        }if(filtro.dica == "dicas"){
          agent.add('Violet é a atiradora com o maior range do jogo, capaz de matar com um tiro só no late game');
          agent.add('A primeira skill é a maior fonte de dano dela, portanto maximize primeiro essa habilidade');
          agent.add('Você deve aproveitar o longo range da bazooka sempre usando o limite do alcance da sua skill para acertar os inimigos de longe sem ter chance de você sofrer algum dano');
          agent.add('O ideal é sempre rolar para trás, nunca para perto do inimigo, pois assim você garante que não vai sofrer nenhum dano');
          agent.add('Caso esteja com dificuldades de acertar a ULT, você pode usar a segunda skill dela antes para causar slow nos inimigos');
          agent.add('Ou fazer capa de gelo no lugar da omniarma e causar slow a longa distancia usando sua primeira skill, é uma boa quando estiver enfrentando heróis com muita mobilidade');
        }
        break;
        
      case 'Volkath':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Wiro':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Wisp':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('A Wisp é uma atiradora focada em crítico, capaz de causar crítico em todas as suas habilidades');
          agent.add('Maximize sua segunda habilidade, é com ela que você stuna seus inimigos');
          agent.add('Sua primeira habilidade foi voltada para posicionamento, use-a como uma forma de escapar, ou para atacar caso tenha certeza da kill em segurança\n\nEla também causa dano em área no momento do ataque, bem parecido com a bazooka da violet, funciona quase que da mesma forma');
          agent.add('Sua segunda habilidade reduz a recarga sempre que acertar um herói inimigo, portanto mire sempre em um!\n\nAlém disso esteja sempre posicionado perto de uma parede, pois o barril explode se encostar em um, fica mais fácil de explodir alguém que pular em cima de você. Mas normalmente o barril explode um pouco antes do limite do alcance do ataque normal da Wisp');
          agent.add('Sua ULT é melhor se utilizada de dentro de um matinho, ou quando você quer atrapalhar a rotação do inimigo, tome muito cuidado pois você fica vulnerável ao usar');
          agent.add('A Wisp é um pouco diferente dos ADCs comuns, sua ULT deve ser utilizada no momento certo pois você não pode se mexer enquanto usa!');
        }
        break;

      case 'Wonder Woman':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Wukong':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Os combos com ele são:\n\nS1-> AA -> S2 -> AA -> ULT -> AA\n\nS2 -> AA -> ULT -> AA -> S1 -> AA -> S3');
        }if(filtro.dica == "dicas"){
          agent.add('Wukong é um assassino/guerreiro burst, focado em critico com um dano absurdo no late game, capaz de entrar e sair de tfs facilmente devido o seu kit');
          agent.add('Maximize primeiro sua segunda habilidade, além de garantir escape através de paredes, te dá agilidade para o elemento surpresa dos ganks');
          agent.add('O Wukong, é um herói totalmente dependente de sorte, pois ele precisa acertar críticos para ser realmente efetivo, portanto o ideal é que além da build suas arcanas sejam focadas em dano crítico\n\nInclusive minha dica é após completar o item da jungle tier 2, compre o item da luva de crítico antes de terminar a bota, ajuda muito o early dele');
          agent.add('Devido a sua passiva, sempre após usar uma habilidade você deve usar AA, mas isso depende.\n\nSe seu ataque der crítico, continue o combo com AA e sua ULT, do contrário, só fuja, pois sem seu crítico você não é nada, lembrando de focar magos e adc primeiro');
          agent.add('Os combos com ele são:\n\nS1-> AA -> S2 -> AA -> ULT -> AA\n\nS2 -> AA -> ULT -> AA -> S1 -> AA -> S3');
          agent.add('Tome cuidado com controle de grupo, Wukong por ser um assassino é extremamente frágil, então, um erro e já era\n\nAlém disso, por ser um herói de late game, seu foco é total em farmar e completar sua build');
          agent.add('Ah, lembrando que você só perde a invisibilidade se bater em alguém, ou seja, dá pra combar suas skills na hora que precisar fugir rapidamente');
        }
        break;

      case 'Xeniel':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('O combo ideal do Xeniel é usar sua primeira habilidade, esperar um tempo, pular na tf com sua segunda, sair e repetir o procedimento');
        }if(filtro.dica == "dicas"){
          agent.add('O Xeniel, apesar de ter em sua descrição Tank/Suporte, você deve imaginar ele como um guerreiro mago, pois suas habilidades causam dano mágico baseado em seu HP');
          agent.add('Maximize sua primeira habilidade, além de ser sua proteção, é com o dano dessa habilidade que você consegue limpar waves de minion mais rápido');
          agent.add('O talento mais indicado para ele é o punir, dessa forma você consegue buildar mais HP e consequentemente causar mais dano\n\nE o ideal é usar sua primeira habilidade, esperar um tempo, pular na tf com sua segunda, sair e repetir o procedimento');
          agent.add('Depois de usar sua ULT, lembre-se de voltar para defender sua lane, e nunca esqueça de limpar ela antes de ultar\n\nFoque usar sua ULT em heróis tanks ou de sustain (Lauriel, Zephys por exemplo), evite heróis que são muito focados como ADC, dependendo da situação, é capaz dele morrer antes de você chegar');
          agent.add('Aproveite das moitas para ativar sua primeira habilidade ou ultar sem que seu inimigo te veja, caso contrário sua ULT pode ser cancelada.\n\nTente ao máximo fazer split push e sempre ultar para se unir a uma tf que já iniciou. O Xeniel não é muito bom iniciando tfs');
          agent.add('Lembrando que sua passiva é: a cada 3 ataques normais, o Xeniel causa dano mágico baseado no seu HP, no late game esse dano é enorme, portanto abuse disso contra heróis mais frágeis');
        }
        break;

      case 'YBneth':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Yena':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Combo básico com a Yena é:\n\nS2a-> S1a -> S1a -> ULT -> S2b\n\nCombo avançado:\n\nS1a(nos minions) -> S2a -> S1a -> ULT -> S2b -> S1b(apertar 2x) -> S2b -> S1b(apertar 2x)\n\nLegenda - a: modo assassino\nb: modo guerreiro');
        }if(filtro.dica == "dicas"){
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

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zanis':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zephys':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zill':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;

      case 'Zip':

        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Zip é um dos melhores suportes do AoV, capaz de mudar completamente TFs se usar suas habilidades no momento certo, perfeito nas mãos de quem tem imaginação e noção de mapa.');
          agent.add('O ideal é que você jogue com amigos ou em dupla, nunca jogue sozinho (soloq), o Zip foi feito para estar sempre próximo ao seu time, protegendo e de preferência se comunicando');
          agent.add('Sua primeira habilidade é um stun capaz de prender dois heróis inimigos, causando dano e atordoando, caso atinja só um esse toma um slow.');
          agent.add('Com sua segunda habilidade ele abre a boca por 1 segundo engole heróis e minions aliados como também monstros da jungle, por 4 segundos, recuperando HP e ganhando imunidade a controle.\n\nÉ considerada nesse momento a melhor habilidade para salvar e proteger seus aliados, capaz de tirar aliados da ULT da Arum e do Omen por exemplo.');
          agent.add('Sua ULT deve ser usada combinada com a segunda, e é aqui onde entra a imaginação, seja para atacar ou recuar, além de ser imune a controle de grupo, Zip ganha mais movimento cada vez que choca alguma parede.');
          agent.add('Não recomendo jogar de Zip quem ta iniciando agora no AoV, suas habilidades precisam ser usadas coordenadas com seu time para tirar o melhor do herói, o que não acontece no low elo');
        }
        break;

      case 'Zuka':
      
        if(filtro.dica == "rapida"){
          agent.add('Te digo em breve, ta?');
        }if(filtro.dica == "combo"){
          agent.add('Não sei nenhum combo para esse herói ainda');
        }if(filtro.dica == "dicas"){
          agent.add('Não tenho dicas para esse herói ainda');
        }
        break;
       
    } 
  }

  if(filtro.hero){
	    return admin.database().ref('/heroisServico').push({
	    	service: dicas,
	    	heroi: filtro.hero
	    });
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                               intentMap                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  let intentMap = new Map();

  intentMap.set('checarDicas', checarDicas);

  intentMap.set('checarBuild', checarBuild);
  
  intentMap.set('checarRunas', checarRunas);

  intentMap.set('checarCounters', checarCounters);
  
  intentMap.set('checarBoots', checarBoots);
  
  intentMap.set('checarArcanas', checarArcanas);

  intentMap.set('glossarioExplicar', glossarioExplicar);

  intentMap.set('listarAlgo', listarAlgo);

  intentMap.set('detalharItens', detalharItens);

  intentMap.set('ultimasAtualizacoes', ultimasAtualizacoes);

  intentMap.set('listar_menu', listar_menu);
  
  agent.handleRequest(intentMap);

});
