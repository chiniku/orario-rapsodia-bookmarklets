javascript:
(function() {
  function a([a, o]) {
    const n = { [r(17)]: i(6), [r(20)]: i(7), [r(22)]: i(8) };
    if (o[r(6)]) {
      const a = { 1: i(9), 2: i(10), 3: i(11), 4: i(12) },
            c = { 1: i(13), 2: i(14), 3: i(15), 4: i(16) };
      console.log("%s(%c%s)", o[r(6)], c[o[r(1)]] || "", a[o[r(1)]] || ""), Object.keys(n).map(a => a === r(17) ? [a, o[a].slice(1)] : [a, o[a]]).filter(([a, e]) => e && e.length).forEach(([a, c]) => {
        const s = c.filter(a => a),
              l = t(o, a) ? `(${i(17)}${t(o,a)})` : "";
        s.length && console.log("\t%s%s", n[a], l), s.forEach(a => {
          const t = "0" !== a[r(12)] ? `(${a[r(12)]}${i(18)})` : "";
          console.log("\t\t%s%s:%s", a[r(13)].trim(), t, a[r(8)].trim()), e(a)
        })
      }), console.log("")
    }
  }

  function e(a) {
    a.effect_info.forEach((a, e) => {
      const t = i(19),
        n = "0" == a[r(3)] ? "" : "2" == a[r(11)] ? `${Math.round(a[r(3)]/10)}%` : `+${a[r(3)]}`,
        c = "0" != a[r(10)] ? `(${o().c[a[r(10)]]||t})` : "",
        s = (o().e[a[r(9)]] || t) + n + c,
        l = (o().t[a[r(15)]] || t) + `(${o().r[a[r(16)]]||t})`,
        u = Number(a[r(4)]) ? `${i(20)}${a[r(4)]}%` : null,
        z = [s, l, Number(a[r(2)]) ? `${a[r(2)]}${i(21)}` : null, u].filter(a => a);
      console.log("\t\t\t(%s%s): %s", i(22), e + 1, z.join(", "))
    })
  }

  function t(a, e) {
    switch (e) {
      case r(17):
        return a[r(0)];
      case r(22):
        return a[r(14)];
      default:
        return null
    }
  }

  function o() {
    return {
      e: { 1: i(23), 2: i(24), 21: i(25), 22: i(26), 23: i(27), 24: i(28), 25: i(29), 26: i(30), 27: i(31), 28: i(32), 29: i(33), 30: i(34), 31: i(35), 32: i(36), 34: i(37), 100: i(38), 101: i(39), 102: i(40), 120: i(41), 121: i(42), 122: i(43), 200: i(44), 201: i(45), 203: i(46), 204: i(47), 205: i(48), 206: i(49), 209: i(50), 211: i(51), 300: i(52), 301: i(53), 302: i(54), 303: i(55), 305: i(56), 306: i(57), 400: i(58), 401: i(59), 402: i(60) },
      c: { 1: i(61), 2: i(62), 4: i(63), 5: i(64), 6: i(65), 8: i(66) },
      t: { 1: i(67), 2: i(68), 3: i(69) },
      r: { 1: i(70), 2: i(71) }
    }
  }

  function n() {
    return document.querySelector("#game_frame").contentDocument
  }

  function c() {
    return document.querySelector("#game_frame").contentWindow
  }

  function r(a) {
    return function([a, e]) {
      const t = a => a.join("_"),
        o = a => a.toUpperCase(),
        n = a => a.replace(/^\w/, a => o(a)),
        c = [!+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[]],
        r = [(a, e) => a + n(e), (a, e) => t([a, e]), (a, e) => t([o(a), o(e)]), (a, e) => n(a) + n(e)];
      return e.match(/.{1,2}/g).map(a => (function(a) {
        return [544492774, 379, 24439348830029, 527744, 535702, 15534, 544369, 544369, 705049401, 16586, 758476349, 677062, 800474, 981267364, 658, 807787, 844678, 32151861, 32312484, 956153, 27325, 999159, 1253979117, 1299306913, 46525100524, 40974374, 40981804, 42897806, 43115759, 1515311121, 35361, 53085711624, 1539318369, 1039, 1281093, 1285914, 46121767, 37744, 46974914, 1708714172, 574965, 643, 923434, 33478462, 27325, 1515311121, 677062, 535702, 544369, 37978444, 22884, 50406906809, 844678][a - 1]
      })(Number(a)).toString(c)).reduce(r[a - 1])
    }(function(a) {
      return [ [3, "012818"], [3, "0349"], [3, "1135"], [3, "1139"], [3, "1427"], [3, "1538"], [3, "1622"], [4, "23"], [3, "281109"], [3, "281110"], [3, "28113110"], [3, "281136"], [3, "281906"], [3, "2822"], [3, "322818"], [3, "3310"], [3, "3326"], [2, "012813"], [1, "20"], [1, "24"], [2, "252813"], [1, "32"], [2, "322813"], [1, "3446"], [1, "4142"], [4, "4143"], [1, "44"], [1, "45"], [4, "46"], [1, "474849"], [1, "5051"], [1, "52"], [1, "53"] ][a]
    }(a))
  }

  function i(a) {
    return s(["a7ia5ra81", "a69a7ea8aa6ja8a", "a5pa6ba6da6s", "1az", "a72a8aa6qa5qa6da61a7s", "a5pa63a6qa5qa77a6da61a7s", "a72a6na6ba77a6da61a7s", "a69a7ea8aa6ja8aa6da61a7s", "tj6", "qa9", "x69", "vls", "2tz36z33z36z39z1nz39z2vz2uz1oz", "2tz36z33z36z39z1nz2xz39z2vz2vz35z1oz", "2tz36z33z36z39z1nz2xz36z33z2uz1oz", "2tz36z33z36z39z1nz2sz33z3cz2vz1oz", "26z3dz", "i5d", "gavlbg", "p81o50", "a6ja8aa81", "swnq5n", "a6ka7ia8aa6c", "a77a7ta5ra63a6ka7ia8aa6c", "l5fl06", "vdkjyg", "laea3i", "a73a6na6sl6x", "a6ka7ia8aa6cgpio50", "u49l06a6ka7ia8aa6c", "u49l06a73a6na6sl6x", "a77a7ta5ra63a6ka7ia8aa6ca5pa6na78", "qqok3a", "26z1uza66a8aa6c", "a6da61a7sa6ka7ia8aa6c", "22z2az", "26z1uza6ka7ia8aa6c", "mim", "x60omw", "a6da6ja81", "mimggogaw", "x60omwggogaw", "a6da6ja81ggogaw", "22z2azi5djyo", "a5pa63a6ba7oa81a6da61a7si5djyo", "ny1kbmoiyjo5i5djyo", "mimi5djyo", "x60omwi5djyo", "a6da6ja81i5djyo", "a69a7ea8aa6ja8aa6da61a7si5djyo", "a71a76a89a6ra71a76ssjvf0", "a5ya5ta81a6ja8a", "wg4mq1a5ya5ta81a6ja8a", "koloqk", "a6ka7ia8aa6ctuun0c", "a4ca3qa4q", "tdvu40", "a82a5oa7ra6d", "hjriki", "a6ta7ua6na78o50", "gk222z2az", "wck22z2az", "a77a7ta5ra63lcx", "ny1kbmoiyjo5lcx", "a67a81a7dl6x", "u49l06lcx", "hmol91", "l73", "r58tsi", "helgk7", "h0fgk7"][a - 1])
  }

  function s(a) {
    return a[r(26)](/.{1,3}/g)[r(27)](a => String[r(29)](window[r(30)](a[r(31)](/z$/, ""), 35)))[r(32)]("")
  }!async function() {
    if (!c().location.search.includes("home_base_deck_index")) return void console.log("編成画面で実行してください");
    const t = await async function() {
      const a = n().querySelector("#deckTabs > a.selected").getAttribute("href").replace(/^#deck\/(\d+)/, "$1"),
        e = new(c().app.collections[r(25)]);
      return await (new e.model).fetch({
        data: {
          [r(24)]: a
        }
      })
    }();
    (function() {
      const a = n().querySelector("#deckTabs > a.selected").innerText;
      console.log(a)
    })(),
      function(e, t) {
        const o = {
          [i(1)]: Object.entries(e[r(18)]),
          [i(2)]: Object.entries(e[r(21)]),
          [i(3)]: Object.entries(e[r(19)])
        };
        Object.entries(o).forEach(([e, t]) => {
          console.log("%s%s%s", i(4).repeat(20), e, i(4).repeat(20)), t.forEach(a)
        })
      }(t.deck_json_list), o = t.skill_list.party, console.log("%s%s%s", i(4).repeat(20), i(5), i(4).repeat(20)), o.filter(a => !0 === a[r(5)]).forEach((a, t) => {
        console.log("\t%s:%s", a[r(13)].trim(), a[r(8)].trim()), e(a)
      });
    var o
  }()
})();
