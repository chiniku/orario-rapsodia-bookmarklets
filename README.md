# orario-rapsodia-bookmarklets
## ダンラプのブックマークレット集
</br>
腱鞘炎の悪化を防ぐために作ったブックマークレットです。指が痛い人はコピペして使って下さい。
</br>
</br>

## [select_card_for_sell.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/select_card_for_sell.js)
「カードのまとめて売却画面」で上から20枚選択するブックマークレット

## [select_card_for_limitbreak.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/select_card_for_limitbreak.js)
限界突破に使用するカードの選択を行うブックマークレット
- 保護中・編成中のカードを除いて最大10枚を選択する
- 「カードで限界突破」のタブのクリックも行うので、「素材で限界突破」のタブが開いている状態からでも実行可能

## [sell_maseki.js](https://github.com/chiniku/orario-rapsodia-bookmarklets/blob/master/sell_maseki.js)
魔石を売却するブックマークレット 
- 「素材」を開いている状態から実行することで、持っている魔石をすべて売却する。
- ダイアログが開くのをsleepで待ち受けてるので信頼性は低い
- 環境によって待ち時間の調整が必要(指定はミリ秒)

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
