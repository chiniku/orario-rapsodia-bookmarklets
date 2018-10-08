# orario-rapsodia-bookmarklets
## ダンラプのブックマークレット集
</br>
腱鞘炎の悪化を防ぐために作ったブックマークレットです。指が痛い人はコピペして使って下さい。
</br>
</br>

## [select_card_for_sell.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/select_card_for_sell.js)
「カードのまとめて売却画面」で上から20枚選択するブックマークレット

## [select_R_for_sell.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/select_R_for_sell.js)
「カードのまとめて売却画面」で指定したRのカードを20枚選択するブックマークレット
- `sell_R_list`に売却したいRのカードの名前を指定する
- 「まとめて売却」を開きブックマークレットを実行すると、`sell_R_list`に指定した順に保護・編成されてない対象Rカードを選択する
- 限界突破していても保護しておらず、編成もされてないカードは選択されるので注意が必要

## [select_card_for_limitbreak.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/select_card_for_limitbreak.js)
限界突破に使用するカードを選択するブックマークレット
- 保護中・編成中のカードを除いて最大10枚を選択する
- 「カードで限界突破」のタブのクリックも行うので、「素材で限界突破」のタブが開いている状態からでも実行可能

## [sell_maseki.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/sell_maseki.js)
魔石を売却するブックマークレット 
- 「素材」を開いている状態から実行することで、持っている魔石をすべて売却する。
- ダイアログが開くのをsleepで待ち受けてるので信頼性は低い
- 環境によって待ち時間の調整が必要(指定はミリ秒)

## [sell_sozai_in_bulk.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/sell_sozai_in_bulk.js)
指定した素材を一括売却するブックマークレット 
- 「素材」ページへの遷移を含めて処理を実施
- 一括売却機能を使って指定した素材をすべて売却する。
- `bulk_sell_items`に売却したい素材の名前を記載する
    - 下のほうにある主な素材のリストにぶつけてidを拾ってるので名前が正しくないと処理されない
- ダイアログが開くのをsleepで待ち受けてるので信頼性は低い
- 環境によって待ち時間の調整が必要(指定は秒)

## [sell_sozai_one_by_one.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/sell_sozai_one_by_one.js)
指定した数以上保持してある素材を売却するブックマークレット(一括売却のブックマークレットの併用を推奨)
- 「素材」ページへの遷移を含めて処理を実施
- 1回の実行で指定したすべての素材をチェックしてそれぞれ売却処理を繰り返し行う
- `item_max_counts`に売却したい素材名と確保しておきたい数を指定
  - 設定例) `"ゴブリンの爪": 30`
  - 下のほうにある主な素材のリストにぶつけてidを拾ってるので名前が正しくないと処理されない
  - `item_max_counts`に指定の無い素材は特に何もしない
- `sell_roughly`の設定により売却処理の内容が変わる
    - `true`を設定している場合、1アイテムにつき最大1回の売却を行う(defaultの動作)
    - `false`に設定している場合、指定した数ぴったりになるように、1アイテムにつき最大2回の売却を行う
- 例) 設定が`"ゴブリンの爪": 30`で実際のアイテム数が85個の場合 
    - `sell_roughly`が`true`なら、50個売却して35個になる
    - `sell_roughly`が`false`なら、50個の売却と5個の売却を行い、ちょうど30個になる
- 環境によって待ち時間の調整が必要(指定は秒)

## [haken_iron.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/haken_iron.js)
鉄鉱石が入手できる派眷先にパーティを派眷するブックマークレット
- 1度の実行で1パーティを派眷
- 派眷画面への遷移、派眷先の選択、メンバー自動編成、出発までを行い、再度派眷画面に戻ってくる
- `haken_order`に設定されている派眷先を変更すれば鉄鉱石以外にも利用可能

## [use_chiniku.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/use_chiniku.js)
血肉を使うブックマークレット 
- ダンジョン探索中に使用可能アイテムのうち最も左側のアイテムを第1パーティに対して使う
- アイテムが血肉かどうかの判定は行っていないので、血肉かどうかに関わらずアイテムを使おうとする
- 戦闘中は使えない
- 第1パーティ以外に適用したい場合は4行目のnth_partyを2や3に変更すればよい
- ダイアログが開くのをsleepで待ち受けてるので信頼性は低い
- 環境によって待ち時間の調整が必要(指定はミリ秒なので1500なら1.5秒)

## [goto_sozai.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/goto_sozai.js)
素材ページへ遷移するブックマークレット 

## [goto_seisei.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/goto_seisei.js)
アイテム生成の3ページ目(血肉)へ遷移するブックマークレット 

## [goto_present.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/goto_present.js)
プレゼントボックスへ遷移するブックマークレット 

## [getall_present.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/getall_present.js)
プレゼントボックスへ遷移しすべて受け取るブックマークレット

## [create_chiniku.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/create_chiniku.js)
アイテム生成の3ページ目に遷移して血肉を生成するブックマークレット
- 舌がある分だけ繰り返し血肉を作成する

## [create_weapon.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/create_weapon.js)
装備を生成するブックマークレット
- 装備生成への遷移から装備の生成までを行う
- `weapon_type`と`weapon_name`に装備の種類と名前を指定する（※1ブックマークレット1装備)
    - 例)
    ```
    const weapon_type = "片手剣";
    const weapon_name = "シルバーソード";
    ```
- 素材となる下位装備は、保護・装備されていないもののうち一番最初にあるものが選択される
- 下位装備の自動生成は行わないので不足している場合は別途生成が必要
- イベント装備には未対応

## [enhance_weapon.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/enhance_weapon.js)
装備を強化するブックマークレット
- 装備強化以外の画面が開いている場合は、装備強化へ遷移する
- 装備強化画面で強化したい装備が選択されている場合、装備の強化を行う
- 素材が不足している場合は途中で停止する
- 素材となる下位装備は、保護・装備されていないもののうち一番最初にあるものが選択される
- 下位装備の自動生成は行わないので不足している場合は別途生成が必要
- イベント装備には未対応

## [tansaku_auto.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/tansaku_auto.js)
オラリオ探索の「出会う」ボタンをクリック後、シナリオ再生をAUTOモードにするブックマークレット
- 一番上に表示されているシナリオが対象（1回の実行で1シナリオ)
- オラリオ探索画面が開いていない場合は、オラリオ探索への遷移も行う
- オラリオ探索の結果が開いている場合はそれを閉じてから処理を行う

## [tansaku_skip.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/tansaku_skip.js)
オラリオ探索の「出会う」ボタンをクリック後、シナリオ再生をスキップするブックマークレット

