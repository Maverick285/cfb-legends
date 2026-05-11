# FM Save Deep Scan Report

Date: 2026-05-07

Purpose: extract architecture-level reference from the decompressed FM save without copying proprietary content. This report inventories structural tokens, subsystem clusters, and table/store co-occurrences that can guide Campus Gridiron Manager.

Source:

- `C:\Users\joshu\AppData\Local\Temp\ULTIMATE25SEASONSTART1_decompressed_stream.bin`
- bytes scanned: `1,025,944,293`
- full JSON report: `C:\Users\joshu\OneDrive\Desktop\FM Game\tmp\fm-save-scan\fm_save_deep_scan.json`

## Container Structure

- `tad.` section markers found: `1,271`
- rough average marker spacing: `807,195` bytes
- first marker offsets: `2, 2952, 17819, 20586, 109970704, 110088930, 386431893, 386446363, 386447009, 386460421, 386574634, 386748762, 386769601, 386871901, 386933470, 387242093, 387250045, 387334451, 387343260, 387504168, 387567370, 387573087, 387579248, 387587381, 387595254`

## Section Shape

| Inferred section type | Sections | Bytes | Examples |
| --- | ---: | ---: | --- |
| large-packed-record-block | 4 | 840,559,897 | #3@20586, #5@110088930, #1209@464994383, #1270@683739757 |
| sparse-binary-records | 880 | 124,631,652 | #6@386431893, #7@386446363, #10@386574634, #11@386748762, #22@387579248 |
| binary-records | 284 | 44,555,904 | #9@386460421, #12@386769601, #13@386871901, #14@386933470, #15@387242093 |
| readable-metadata | 101 | 16,179,204 | #0@2, #4@109970704, #8@386447009, #27@387618189, #38@388329232 |
| object-pool-dictionary | 1 | 14,867 | #1@2952 |
| person-name-or-demographic-table | 1 | 2,767 | #2@17819 |

## Largest Sections

| Index | Offset | Size | Inferred type | Printable ratio | Zero ratio | Sample |
| ---: | ---: | ---: | --- | ---: | ---: | --- |
| 1270 | 683739757 | 342,204,536 | large-packed-record-block | 0.375 | 0.02 | pks_0 w ^ ^ < # / R p; U F Q \ 4 i A at O v V W m T E w ( / P b NPXr It 3Z * b~ "z g @h . I Bj Q F [ A { U n #i *Bm?. . @ l0 ( J ( w L .W$I _ z &B~ 9 ` R w? P ] q[ ` X G , X / _#M  |
| 5 | 110088930 | 276,342,963 | large-packed-record-block | 0.593 | 0.227 | } Skj rv Kvitland/} Hovdahl Sandr d0} ien Paulsen1} Singsdal Volden2} Kviteng3} Riaunet4} Svanem5} Kr kmo6} Koteng7} Holltr 8} Leseth9} Stolsmo:} Vingelen;} Hastadklev<} Lund Tronh |
| 1209 | 464994383 | 112,062,280 | large-packed-record-block | 0.052 | 0.773 | D : ; + G ] ~ + 7 [ d ? @ 2 v @ 2 v E 7 K I K 7 2 T / : @ 1 > J : B E 7 K I K I @ & @ + { * t u T x ; % > { * t u T x ; % > { * t u x ; % > M F F C B { L L < I M F F C B * T h ' Z  |
| 3 | 20586 | 109,950,118 | large-packed-record-block | 0.01 | 0.715 | 2430K2 $ Q [ \| 3 x 3 W W 6 q J m 8 4 T / B c B P } + u % K K ? \ ? ^ ) R 5 A ? : 6 s - ^ + * ) " # & ' ) * + , - / 0 3 4 6 7 k l n o p q # r s t w x { } |
| 1220 | 631694416 | 34,131,674 | sparse-binary-records | 0.082 | 0.661 | 4 l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l 3 l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l 3 l l l l l l l  |
| 1215 | 577196084 | 18,789,133 | binary-records | 0.027 | 0.198 | . u v 4 F H L T ` k /E (I c x 9 j + V M % W Y n 6 9 ; 9 - f \| ] d 5 6 O R U ? ^ l ; s s 1 c V D6 Y ? 2 2 &9 )9 a ux wx 0 0 [ 6 ( ! " F H J M 3 J K o r s > 0 S E E E E I I I I j j { |
| 1216 | 595985217 | 18,157,513 | sparse-binary-records | 0.042 | 0.673 | \ ,6 ,6 l l l . ! l l U4 ! l l m ! l l 2 l l l Zc 7 7 w l U l { % % l l l ? @f l l %N n n @ l q l ! ! l Q l l h ( ( l = ! ) ) l 9* l \ \ l E ^ ^ l l f = N = = l l z l l Q l ( X l ` |
| 884 | 439132744 | 14,077,509 | sparse-binary-records | 0.085 | 0.378 | L L R V @ 0u " J n = n J 8 O k !E n J MN ` }. ?% n J f n- n J a @ X ) nQ $ z : n J D > @ D & 4 6 # 8 n J D 8 @ m M? & 4 ? 8 n mK > // : 0 n J D 8 x L n J D @ _ .` _ - , - D _` x _  |
| 1218 | 614148172 | 12,818,247 | sparse-binary-records | 0.268 | 0.41 | l Q 8 \ y y f > F 4 4 0 \| dO l & . ;R 6 C N Q 0 0 0 z T~ \| x} cL \| z \| . { L z \|L z z F z < z m ,y ,y ,y " Px Px 9 Px w Px M Px Px Px X Px ^_ Px tw M tw tw tw C tw : tw I/ v v v o  |
| 1247 | 675922341 | 5,834,701 | sparse-binary-records | 0.053 | 0.594 | l l l ^5 ^5 dddd l l l l l l l l l l - < dddd l l l l l l l l l l l l l l dddd " l l l f l l l l l 4 dddd l l l l l l l l l l , dddd l l D l f l l ! l l R < R ! / S : dddd / S : l  |
| 1219 | 626966419 | 4,727,997 | sparse-binary-records | 0.122 | 0.461 | # % j x + V k /E F T ` x + j u L k F T c /E j x + V ` k /E F T (I F k o s n H Vn M4 u L c /E o5 m % % n f W ; \| 9 Y d 6 9 5 ] % n Y W f ; 9 6 9 - ] \| d % n f W ; \| 9 Y d 6 9 5 ] n  |
| 1246 | 673012431 | 2,909,910 | sparse-binary-records | 0.266 | 0.316 | z , - Vg . 4 0 5 68 9 * ! x6 ! \ F ! e 2 ! Z * " Lg " l " o P# t "]# `# $ $ $ t/ g% 6 P~% S % rd p3& N-' E2 K2 n" ^2 ] 3 .#6 r \ 9 Z 9 . XB TF 6J Q T ~ $ m E% ( 8 }3 o v?t 4A! $ \  |
| 1228 | 667379876 | 2,253,742 | sparse-binary-records | 0.137 | 0.305 | 0 q z ` F k j (I x V /E + I JBk c _ q z % ] 5 d 9 f W ; \| 9 6 Y n I JBk M n _ q y D s )9 Y 1 c s D6 ux V ? ? I RBp _ q z I o I I M ! S 3 8< F " .< r E K J I I JBk B _ q = y { l . / |
| 1229 | 669633618 | 1,799,799 | sparse-binary-records | 0.004 | 0.663 | - t s y w " - n o p } m l { l ~ w y y & k " v { \| 2 ) 3 ! j ~ 6 u u h |
| 1224 | 665833748 | 1,454,818 | sparse-binary-records | 0.163 | 0.55 | u` = 0 0 H H ` ` x x 8 8 P P h h ( ( @ @ X X p p - 0 H ` x 0 H ` x 8 P h 8 P h 1 0 H 8 ` P x h 8 ( P @ h X p ( @ 0 ? 0 H ` x 0 H ` x 8 P h 8 P h ( @ X p ( @ X p - p 0 H ` x 0 H ` x |
| 1203 | 463521246 | 1,355,456 | sparse-binary-records | 0.171 | 0.442 | " :w # :w $ :w % :w & :w . n n o B B { r r \| 2 2 : : z 2 2 R 7 g g C - V 3 * * ]9 3 F F 3 bX 5 Y 3 * * .2 ' s ' ' % ' O ' o o 1 ' 1 # 5 ' 9 5 ' # ' P + ' ' % ' $ ' $ $ T ' $ a9 > ' |
| 883 | 438089208 | 1,043,536 | sparse-binary-records | 0.066 | 0.382 | m Y, l l l l l l l l B l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l |
| 399 | 412929968 | 785,213 | readable-metadata | 0.501 | 0.134 | ? , 5 eytf srev pmoc epyt lvel raey pagy rysb nrtd di nrtdnmts oyts nmne oyne nicd irxf sgts di puCFxdni epyt smtn sdnr mnts di mntsngts smtn tmmn H tdrd di tdrdemit j woyd moyd tn |
| 1257 | 682769317 | 730,772 | sparse-binary-records | 0 | 0.997 | N |
| 1236 | 672105060 | 727,426 | sparse-binary-records | 0.143 | 0.462 | p V @ p @ P P 0 D + P ` ` P p ? P i C p 0 B ` 7 + @ PH @v 7 P p @ z p @ @ P @ ` ; Y ] ` p p ` E Pm I p P P P3 3 @ ps ( ` 0C `C $ 0r 0` P 0~ C @b 0{ 9 K P 0 @ P ` 0 p ` P u 1 f ` +  |

## Target Store Hits

| Store or subsystem token | Hits | First offsets |
| --- | ---: | --- |
| `FIXTURE_RULES` | 75 | 13952, 30803423, 30804638, 30805660, 30805775 |
| `WORLD` | 26 | 9321, 24661952, 25583206, 25650754, 25658702 |
| `EVENT` | 6 | 5035, 5509, 5527, 6044, 6249 |
| `RETIREMENT` | 4 | 2203, 2258, 15250, 16790 |
| `NEWGEN` | 3 | 15170, 15226, 16994 |
| `PERSON_HISTORY` | 3 | 14314, 15957, 16858 |
| `SCOUTED_PERSON` | 3 | 13027, 13053, 14775 |
| `CLUB_FINANCE` | 2 | 8786, 8868 |
| `COMP_HISTORY` | 2 | 9024, 16536 |
| `PAST_TRANSFER` | 2 | 7099, 16593 |
| `PLAYER_ATTRIBUTE_SNAPSHOT` | 2 | 11696, 12680 |
| `PLAYING_HISTORY` | 2 | 16105, 16132 |
| `REGEN` | 2 | 2081, 2137 |
| `SQUAD_SELECTION_RULES` | 2 | 6626, 6920 |
| `STAFFING_POLICY` | 2 | 9075, 9098 |
| `TRANSFER_DEADLINE_DAY` | 2 | 7001, 13154 |
| `TRANSFER_WINDOW` | 2 | 13131, 17763 |
| `CONTRACT_OFFER` | 1 | 11559 |
| `DYNAMICS` | 1 | 2677 |
| `FAILED_CONTRACT_NEGOTIATION_INFO` | 1 | 9886 |
| `FIXTURE_RECORD` | 1 | 15802 |
| `FIXTURE_RESULT` | 1 | 5792 |
| `FIXTURE_TO_PLAY_FULL` | 1 | 16244 |
| `FIXTURE_TO_PLAY_QUICK` | 1 | 15773 |
| `FULL_CONTRACT` | 1 | 11489 |
| `FULL_TRANSFER_OFFER` | 1 | 14582 |
| `INDIVIDUAL_TRAINING_INFO` | 1 | 11915 |
| `INJURY_HISTORY` | 1 | 16025 |
| `INTERACTION_CONVERSATION_HISTORY` | 1 | 15505 |
| `INTERACTION_PROMISE` | 1 | 15612 |
| `LOAN_CONTRACT` | 1 | 12478 |
| `NON_PLAYER_ATTRIBUTE_SNAPSHOT` | 1 | 11692 |
| `NON_PLAYER_TENDENCY_ARRAY` | 1 | 11581 |
| `NON_PLAYING_HISTORY` | 1 | 16128 |
| `PERSON_YEAR_AWARD_HISTORY` | 1 | 16416 |
| `PLAYER_PROGRESS_OBSERVATION` | 1 | 11880 |
| `PLAYER_STATS_HISTORY` | 1 | 16077 |
| `POSITION_TRAINING` | 1 | 12088 |
| `PRESS_CONFERENCE_HISTORY` | 1 | 8153 |
| `PROMISE` | 1 | 15624 |
| `RELATIONSHIP` | 1 | 6140 |
| `RIVALRY` | 1 | 14253 |
| `SCOUTED_TEAM_INFO` | 1 | 11095 |
| `STARTING_FUTURE_TRANSFER` | 1 | 8217 |
| `TACTICAL_TRAINING_DATA` | 1 | 11974 |
| `TEAM_FUTURE_FIXTURE` | 1 | 9670 |
| `TRIAL_CONTRACT` | 1 | 12871 |

## Nearby Subsystem Clusters

These clusters are not schema proof by themselves. They show which named stores/subsystems appear near each other in the binary and are useful leads for our architecture.

| Start | End | Span | Targets |
| ---: | ---: | ---: | --- |
| 2081 | 17763 | 15682 | EVENT (6), RETIREMENT (4), NEWGEN (3), PERSON_HISTORY (3), SCOUTED_PERSON (3), CLUB_FINANCE (2), COMP_HISTORY (2), PAST_TRANSFER (2), PLAYER_ATTRIBUTE_SNAPSHOT (2), PLAYING_HISTORY (2), REGEN (2), SQUAD_SELECTION_RULES (2), STAFFING_POLICY (2), TRANSFER_DEADLINE_DAY (2), TRANSFER_WINDOW (2), CONTRACT_OFFER (1), DYNAMICS (1), FAILED_CONTRACT_NEGOTIATION_INFO (1), FIXTURE_RECORD (1), FIXTURE_RESULT (1), FIXTURE_RULES (1), FIXTURE_TO_PLAY_FULL (1), FIXTURE_TO_PLAY_QUICK (1), FULL_CONTRACT (1), FULL_TRANSFER_OFFER (1), INDIVIDUAL_TRAINING_INFO (1), INJURY_HISTORY (1), INTERACTION_CONVERSATION_HISTORY (1), INTERACTION_PROMISE (1), LOAN_CONTRACT (1), NON_PLAYER_ATTRIBUTE_SNAPSHOT (1), NON_PLAYER_TENDENCY_ARRAY (1), NON_PLAYING_HISTORY (1), PERSON_YEAR_AWARD_HISTORY (1), PLAYER_PROGRESS_OBSERVATION (1), PLAYER_STATS_HISTORY (1), POSITION_TRAINING (1), PRESS_CONFERENCE_HISTORY (1), PROMISE (1), RELATIONSHIP (1), RIVALRY (1), SCOUTED_TEAM_INFO (1), STARTING_FUTURE_TRANSFER (1), TACTICAL_TRAINING_DATA (1), TEAM_FUTURE_FIXTURE (1), TRIAL_CONTRACT (1), WORLD (1) |

## Frequent Target Pairings

| Token A | Token B | Near hits |
| --- | --- | ---: |
| `EVENT` | `RETIREMENT` | 24 |
| `EVENT` | `NEWGEN` | 18 |
| `PERSON_HISTORY` | `EVENT` | 18 |
| `SCOUTED_PERSON` | `EVENT` | 18 |
| `COMP_HISTORY` | `EVENT` | 12 |
| `EVENT` | `REGEN` | 12 |
| `EVENT` | `STAFFING_POLICY` | 12 |
| `EVENT` | `CLUB_FINANCE` | 12 |
| `EVENT` | `PLAYER_ATTRIBUTE_SNAPSHOT` | 12 |
| `PAST_TRANSFER` | `EVENT` | 12 |
| `PERSON_HISTORY` | `RETIREMENT` | 12 |
| `PLAYING_HISTORY` | `EVENT` | 12 |
| `RETIREMENT` | `NEWGEN` | 12 |
| `SCOUTED_PERSON` | `RETIREMENT` | 12 |
| `SQUAD_SELECTION_RULES` | `EVENT` | 12 |
| `TRANSFER_DEADLINE_DAY` | `EVENT` | 12 |
| `TRANSFER_WINDOW` | `EVENT` | 12 |
| `PERSON_HISTORY` | `SCOUTED_PERSON` | 9 |
| `PERSON_HISTORY` | `NEWGEN` | 9 |
| `SCOUTED_PERSON` | `NEWGEN` | 9 |
| `COMP_HISTORY` | `RETIREMENT` | 8 |
| `PAST_TRANSFER` | `RETIREMENT` | 8 |
| `PLAYING_HISTORY` | `RETIREMENT` | 8 |
| `RETIREMENT` | `REGEN` | 8 |
| `RETIREMENT` | `STAFFING_POLICY` | 8 |
| `RETIREMENT` | `CLUB_FINANCE` | 8 |
| `RETIREMENT` | `PLAYER_ATTRIBUTE_SNAPSHOT` | 8 |
| `SQUAD_SELECTION_RULES` | `RETIREMENT` | 8 |
| `TRANSFER_DEADLINE_DAY` | `RETIREMENT` | 8 |
| `TRANSFER_WINDOW` | `RETIREMENT` | 8 |
| `COMP_HISTORY` | `SCOUTED_PERSON` | 6 |
| `COMP_HISTORY` | `NEWGEN` | 6 |
| `CONTRACT_OFFER` | `EVENT` | 6 |
| `EVENT` | `WORLD` | 6 |
| `EVENT` | `NON_PLAYER_ATTRIBUTE_SNAPSHOT` | 6 |
| `EVENT` | `NON_PLAYER_TENDENCY_ARRAY` | 6 |
| `EVENT` | `PLAYER_PROGRESS_OBSERVATION` | 6 |
| `EVENT` | `INDIVIDUAL_TRAINING_INFO` | 6 |
| `EVENT` | `TACTICAL_TRAINING_DATA` | 6 |
| `EVENT` | `POSITION_TRAINING` | 6 |

## Token Inventory By Domain

### History

- `AWARD` (1)
- `AWARD_PERSON` (1)
- `BASE_FINANCE_RECORD` (1)
- `COMP_HISTORY` (1)
- `COMP_HISTORY_RECORD` (1)
- `CURRENCY_RECORD` (1)
- `DATABASE_RECORD_REFERENCE` (1)
- `EXTENDED_COMP_RECORDS` (1)
- `FIXTURE_RECORD` (1)
- `HOF_MANAGER_RECORD` (1)
- `INJURY_HISTORY` (1)
- `INTERACTION_CONVERSATION_HISTORY` (1)
- `MANAGER_RECORDS` (1)
- `NON_PLAYING_HISTORYA` (1)
- `PERSON_HISTORY` (1)
- `PERSON_HISTORY_CAREER_ENTRY` (1)
- `PERSON_YEAR_AWARD_HISTORY` (1)
- `PLAYER_STATS_HISTORY` (1)
- `PLAYING_HISTORY` (1)
- `PRESS_CONFERENCE_HISTORY` (1)
- `RECORD` (1)
- `REMOVED_RECORD` (1)
- `STARTING_AWARD_HISTORY` (1)
- `STARTING_MANAGER_HOF_RECORD` (1)
- `STARTING_PERSON_HISTORY` (1)
- `STARTING_PLAYER_RECORD_INFO` (1)
- `STARTING_RECORD` (1)
- `STARTING_TEAM_CUP_HISTORY` (1)
- `STARTING_TEAM_LEAGUE_HISTORY` (1)
- `TC_CUP_HISTORY` (1)
- `TC_EXTENDED_CLUB_RECORDS` (1)
- `TC_EXTENDED_NATION_RECORDS` (1)
- `TC_LEAGUE_HISTORY` (1)
- `TCR_RECORDS_INFO` (1)
- `TEAM_CONTAINER_HISTORY` (1)

### Calendar Fixture

- `CANDIDATE_HOST` (1)
- `COMP_SCHEDULE_DATE` (1)
- `DATE_IN_YEAR_FOR_YEAR` (1)
- `DATE_IN_YEARY` (1)
- `FIXTURE` (1)
- `FIXTURE_DEL_ARRAYD` (1)
- `FIXTURE_GROUP_FIXTURES0` (1)
- `FIXTURE_NAME` (1)
- `FIXTURE_RECORD` (1)
- `FIXTURE_RESULT` (1)
- `FIXTURE_RULESP` (1)
- `FIXTURE_SCORE` (1)
- `FIXTURE_TEAM_EVENT_INFO_ARRAY` (1)
- `FIXTURE_TO_PLAY_FULL` (1)
- `FIXTURE_TO_PLAY_QUICK` (1)
- `LEAGUE_DATE` (1)
- `SHORT_FIXTURE` (1)
- `STADIUM_DATE` (1)
- `TEAM_FIXTURE_BLOCK` (1)
- `TEAM_FUTURE_FIXTURE` (1)
- `TRANSFER_DEADLINE_DAY` (1)
- `TRANSFER_DEADLINE_DAY_INVOLVED_PLAYER` (1)

### Transaction

- `CONTRACT_MANAGER_` (2)
- `TRANSFER_MANAGER_` (2)
- `ACTUAL_PERSON_EXTRA_CONTRACTSG5` (1)
- `B_CLUB_CONTRACT` (1)
- `B_CLUB_MOVE_OFFER` (1)
- `BASIC_CONTRACTS` (1)
- `CLUB_DEVELOPED_PLAYER_TRANSFERRED_INFO` (1)
- `CONTRACT_OFFER` (1)
- `EXTRA_TRANSFER_PAYMENT_INFOJ` (1)
- `FAILED_CONTRACT_NEGOTIATION_INFO` (1)
- `FAILED_INTERMEDIARY_TRANSFER_NEGOTIATION_INFO` (1)
- `FULL_CONTRACT` (1)
- `FULL_TRANSFER_OFFER` (1)
- `LOAN` (1)
- `LOAN_CONTRACT` (1)
- `LOAN_OFFER` (1)
- `MAX_OVER_23_PLAYERS_ON_LOAN_FROM_A_TEAM_INFOF` (1)
- `MAX_PLAYERS_ON_LOAN_FROM_A_TEAM_INFOQ` (1)
- `MAX_PLAYERS_ON_LOAN_IN_SEASON_INFO` (1)
- `MAX_PLAYERS_ON_LONG_TERM_LOAN_IN_SEASON_INFOD` (1)
- `MAX_PLAYERS_OUT_ON_LOAN_IN_SEASON_INFO` (1)
- `MAX_TRANSFERS_IN_A_SEASON_USING_SQUAD_SELECTION_RULE_INFO` (1)
- `MAX_TRANSFERS_IN_A_TRANSFER_WINDOW_INFO` (1)
- `OFFER_SHARED_DATA` (1)
- `PAST_OFFER` (1)
- `PAST_TRANSFER` (1)
- `RECENT_LOAN_SPELL_DATA` (1)
- `STARTING_DRAFT_TRANSFER` (1)
- `STARTING_FUTURE_TRANSFER` (1)
- `STARTING_LOAN` (1)
- `STARTING_PAST_TRANSFER` (1)
- `TRANSFER` (1)
- `TRANSFER_CONFIDENCE` (1)
- `TRANSFER_DEADLINE_DAY` (1)
- `TRANSFER_DEADLINE_DAY_INVOLVED_PLAYER` (1)

### Scouting Recruiting

- `SCOUT_MANAGER_` (2)
- `FOOTBALL_FOCUS_DATA` (1)
- `KNOWLEDGE` (1)
- `KNOWLEDGE_ARRAY` (1)
- `RECRUITMENT_FOCUS` (1)
- `SCOUTED_PERSON_TAG` (1)
- `SCOUTED_PERSON_TAG_EXTRA_DATA` (1)
- `SCOUTED_PERSONP` (1)
- `SCOUTED_TEAM_INFO` (1)

### People Staff

- `MANAGER_MANAGER_` (9)
- `INTERACTION_MANAGER_` (8)
- `HUMAN_NON_PLAYER_MANAGER_` (3)
- `CONTRACT_MANAGER_` (2)
- `PERSON_PROGRESSION_MANAGER_` (2)
- `REGENERATION_MANAGER_` (2)
- `RETIREMENT_MANAGER_` (2)
- `SCOUT_MANAGER_` (2)
- `TRAINING_MANAGER_` (2)
- `TRANSFER_MANAGER_` (2)
- `ACCEPTED_BID_PLAYER_DATA` (1)
- `ACTUAL_NON_PLAYER` (1)
- `ACTUAL_PERSON_EXTRA_CONTRACTSG5` (1)
- `ACTUAL_PLAYER` (1)
- `ACTUAL_PLAYER_AND_NON_PLAYER` (1)
- `AWARD_PERSON` (1)
- `AWOL_PLAYER_DATA` (1)
- `BASE_INTERNATIONAL_PERSON_DATA` (1)
- `BASE_PERSON_COMP_STATS` (1)
- `BASIC_PERSONV` (1)
- `BEST_ELEVEN_PERSONO` (1)
- `CLUB_DEVELOPED_PLAYER_TRANSFERRED_INFO` (1)
- `CLUB_HUMAN_MANAGER_DETAILS` (1)
- `CLUB_MANAGER_DETAILS` (1)
- `CLUB_STAFF_JOB_STATUS_INFO` (1)
- `DYNAMICS_PIVOTAL_MOMENTS_MANAGER_` (1)
- `FEEDER_CLUB_MANAGER_` (1)
- `FINANCE_MANAGER_` (1)
- `FULL_PLAYER_STATS_ARRAY` (1)
- `GAME_MATCH_MANAGER` (1)
- `GAME_MATCH_PLAYER_STATS` (1)
- `HOF_MANAGER` (1)
- `HOF_MANAGER_RECORD` (1)
- `HUMAN_NON_PLAYER` (1)
- `INT_DUTY_PLAYER_COUNT` (1)

### Relationships Interactions

- `INTERACTION_MANAGER_` (8)
- `DYNAMICS_PIVOTAL_MOMENTS_MANAGER_` (1)
- `INTERACTION_COMMENT` (1)
- `INTERACTION_COMMENT_TEMPLATE` (1)
- `INTERACTION_CONVERSATION_HISTORY` (1)
- `INTERACTION_PROMISE` (1)
- `MATCH_RELATIONSHIP` (1)
- `TEAM_MEETING_INTERACTION_COMMENT` (1)

### World Rules

- `BASE_INTERNATIONAL_PERSON_DATA` (1)
- `BASE_PERSON_COMP_STATS` (1)
- `CLUB_CUP_POINTS` (1)
- `COMP_` (1)
- `COMP_HISTORY` (1)
- `COMP_HISTORY_RECORD` (1)
- `COMP_PAST_SEQUENCES` (1)
- `COMP_QUALIFIED_TEAM` (1)
- `COMP_REGISTERED_TEAM` (1)
- `COMP_SCHEDULE_DATE` (1)
- `COMPETITION_BONUS_INFO` (1)
- `COMPETITION_POSITION_BIO` (1)
- `COMPOSITE_APPEARANCE` (1)
- `COMPOSITE_IMAGE` (1)
- `CONT_CUP_QUALIFIED_PLACE` (1)
- `CONT_CUP_RESERVED_PLACEM` (1)
- `CUP_FOR_LEAGUE_POSITION` (1)
- `CUP_ROUND` (1)
- `CUP_SETTINGS` (1)
- `CUP_TIE` (1)
- `CUP_TIE_MAPPING` (1)
- `CUPS` (1)
- `DAYS_AT_CLUB_OR_NATION` (1)
- `EXTENDED_COMP_RECORDS` (1)
- `FIXTURE_RULESP` (1)
- `GAME_COMP_STATS` (1)
- `GAME_TEAM_COMP_STATS` (1)
- `INTERNATIONAL_COMPETITION_CONFIDENCE` (1)
- `INTERNATIONAL_PLAYER_DATA` (1)
- `INTERNATIONAL_PLAYER_HAPPINESS` (1)
- `LEAGUE_BODY_CLUB` (1)
- `LEAGUE_DATE` (1)
- `LEAGUE_SETTINGS` (1)
- `LEAGUE_STAGE` (1)
- `LEAGUE_TEAM` (1)

### Finance

- `APPEARANCE_MONEY_INFO` (1)
- `BASE_FINANCE_RECORD` (1)
- `CLUB_FINANCE` (1)
- `CLUB_FINANCE_BASEB` (1)
- `EPPP_APPEARANCE_MONEY_INFO` (1)
- `FEEDBACK_HELPER` (1)
- `FEEDER_CLUB_MANAGER_` (1)
- `FINANCE_MANAGER_` (1)
- `FINANCE_TOTALS` (1)
- `NATIONAL_TEAM_SQUAD_SELECTION_MONEY_INFO` (1)
- `PLAYER_MATCH_FEEDBACK` (1)
- `PLAYER_MAX_WAGE_EXEMPTION_INFO` (1)
- `RELEASED_PLAYER_WAGES` (1)
- `SALARY_CAP_BANKING` (1)
- `SQUAD_SELECTION_PLAYER_VALUES` (1)
- `STARTING_MLS_GENERAL_ALLOCATION_MONEY` (1)
- `STARTING_MLS_TARGETED_ALLOCATION_MONEY` (1)
- `STARTING_WEEKLY_WAGE_CONTRIBUTION` (1)
- `TEAM_DIVISION_SQUAD_SELECTION_TOTAL_VALUES_INFO` (1)
- `TYPED_VALUE` (1)

### Training Development

- `PERSON_PROGRESSION_MANAGER_` (2)
- `TRAINING_MANAGER_` (2)
- `INDIVIDUAL_TRAINING_INFO` (1)
- `NON_PLAYER_ATTRIBUTE_SNAPSHOT` (1)
- `PLAYER_ATTRIBUTE_SNAPSHOT` (1)
- `PLAYER_PROGRESS_OBSERVATION8` (1)
- `POSITION_TRAININGW` (1)
- `TACTICAL_TRAINING_DATA` (1)
- `TEAM_TRAINING_INFO` (1)
- `TRAINING_CAMP` (1)
- `TRAINING_SESSION0` (1)

### Media News

- `FAILED_INTERMEDIARY_TRANSFER_NEGOTIATION_INFO` (1)
- `MEDIA_CLUB` (1)
- `MEDIA_SOURCE` (1)
- `MEDIA_SOURCE_EXPECTATION` (1)
- `NEWS_MANAGER_` (1)
- `PRESS_CONFERENCE_ALTERNATIVE_ANSWER_TEMPLATE` (1)
- `PRESS_CONFERENCE_ANSWERED_QUESTION` (1)
- `PRESS_CONFERENCE_HISTORY` (1)
- `PRESS_CONFERENCE_MANAGER_` (1)
- `PRESS_CONFERENCE_QUESTION` (1)
- `PRESS_CONFERENCE_QUESTION_TEMPLATEJ` (1)
- `STARTING_MEDIA_EXPECTATIONS` (1)

### Lifecycle Stability

- `REGENERATION_MANAGER_` (2)
- `RETIREMENT_MANAGER_` (2)
- `NEWGEN_PARAMETER` (1)
- `NEWGEN_TEMPLATE` (1)
- `RETIRED_PERSON_NAME_POINTERS` (1)
- `RETIRED_PERSON_NAME_STRINGSY` (1)
- `RETIREMENT` (1)
- `STARTING_NEWGEN_PARAMETER` (1)
- `STARTING_RETIREMENT` (1)

## Implementation Implications For CGM

- Treat save data as subsystem-owned records: person history, playing history, non-playing history, awards, injuries, competition history, fixtures, transfers, contracts, scouting, training, finance, and interactions should not be collapsed into one large entity blob.
- Keep append-only history separate from current state. The FM save exposes distinct history families rather than deriving everything from current player/team values.
- Model world stability as explicit migration and repair systems. The save exposes many patch/migration terms, which points to versioned fixups as a normal part of long-running saves.
- Make transactions first-class records. Contracts, transfer offers, past transfers, future transfers, loans, trials, and failed negotiations are durable objects, not temporary UI state.
- Separate calendar queues from completed history. Future fixtures, fixtures to play, fixture results, deadlines, and windows appear as different records.
- Keep staff/non-player data parallel to player data. Non-player snapshots and tendency arrays are distinct enough to deserve their own stores.
