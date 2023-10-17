# mastodon-timeline

アクセストークン等を使用せず、お手軽にMastodonのタイムラインをWebページに読み込むことができます。

<p align="center">
  <img src="https://github.com/nove-b/mastodon-timeline/assets/68768186/9408bb44-1115-444b-8013-550d6a409780" />
</p>

# How To Use

1.[リリースページ](https://github.com/nove-b/mastodon-timeline/releases)から最新版のインストールパッケージをダウンロードし、適当なフォルダに解凍してください。
2.使用するのはインストールしたパッケージ内にある`mastodon-timeline`フォルダなので、任意のフォルダに格納し、使用するページからリンクをしてください。
3.使用するページで下記のように記述し、呼び出してください。
```
  <div id="MastodonTimeline" data-server="https://mstdn.jp/" data-username="mstdn_jp"
    data-message="フォローしてください🖐">
  </div>
```
