javascript:
(function() {
  const a = [ [3, "012818"], [3, "0349"], [3, "1135"], [3, "1139"], [3, "1427"], [3, "1538"], [3, "1622"], [4, "23"], [3, "281109"], [3, "281110"], [3, "28113110"], [3, "281136"], [3, "281906"], [3, "2822"], [3, "322818"], [3, "3310"], [3, "3326"], [2, "012813"], [1, "20"], [1, "24"], [2, "252813"], [1, "32"], [2, "322813"], [1, "3430"], [1, "4142"], [4, "4143"], [1, "44"], [1, "45"], [4, "30"], [1, "474849"], [1, "5051"], [1, "52"], [1, "53"], [3, "545522"], [3, "56145758"], [4, "7172"], [3, "5960"], [3, "6160"], [3, "62145758"], [3, "3363"], [2, "1113"], [1, "641365"], [2, "6667"], [2, "686970"], [3, "283610"], [2, "7313"], [1, "347430"], [4, "877688"], [4, "788680"], [4, "878283"], [4, "8485868788"], [1, "89"], [1, "90"], [1, "91"], [1, "9262"], [1, "9256"], [1, "9394"] ],
    z = [544492774, 379, 24439348830029, 527744, 535702, 15534, 544369, 544369, 705049401, 16586, 758476349, 677062, 800474, 981267364, 658, 807787, 844678, 32151861, 32312484, 956153, 27325, 999159, 1253979117, 1299306913, 46525100524, 40974374, 40981804, 42897806, 43115759, 1515311121, 35361, 53085711624, 1539318369, 1039, 1281093, 1285914, 46121767, 37744, 46974914, 1708714172, 574965, 643, 923434, 33478462, 27325, 1515311121, 677062, 535702, 544369, 37978444, 22884, 50406906809, 844678, 502033, 18749580, 17968, 620, 614929692, 1654099686913, 37189067, 1659098183224, 43274099, 32562367, 17977, 13229, 1434777384553, 462413, 829, 22012829, 570650, 17, 25, 1514595978, 1139501874, 10, 29, 20, 13, 14, 15, 10, 16, 18, 11, 27, 14, 10, 20, 1124974882, 27333, 815775792, 30988, 19242, 612937];

  function o(o) {
    return function([a, o]) {
      const t = a => a.join("_"),
        n = a => a.toUpperCase(),
        i = a => a.replace(/^\w/, a => n(a)),
        r = [!+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[]],
        s = [(a, z) => a + i(z), (a, z) => t([a, z]), (a, z) => t([n(a), n(z)]), (a, z) => i(a) + i(z)];
      return o.match(/.{1,2}/g).map(a => z[Number(a) - 1].toString(r)).reduce(s[a - 1])
    }(a[o - 1])
  }
  var t = ["a7ia5ra81", "a69a7ea8aa6ja8a", "a5pa6ba6da6s", "1az", "a72a8aa6qa5qa6da61a7s", "a5pa63a6qa5qa77a6da61a7s", "a72a6na6ba77a6da61a7s", "a69a7ea8aa6ja8aa6da61a7s", "tj6", "qa9", "x69", "vls", "2tz36z33z36z39z1nz39z2vz2uz1oz", "2tz36z33z36z39z1nz2xz39z2vz2vz35z1oz", "2tz36z33z36z39z1nz2xz36z33z2uz1oz", "2tz36z33z36z39z1nz2sz33z3cz2vz1oz", "26z3dz", "i5d", "gavlbg", "p81o50", "a6ja8aa81", "swnq5n", "a6ka7ia8aa6c", "a77a7ta5ra63a6ka7ia8aa6c", "l5fl06", "vdkjyg", "laea3i", "a73a6na6sl6x", "a6ka7ia8aa6cgpio50", "u49l06a6ka7ia8aa6c", "u49l06a73a6na6sl6x", "a77a7ta5ra63a6ka7ia8aa6ca5pa6na78", "qqok3a", "26z1uza66a8aa6c", "a6da61a7sa6ka7ia8aa6c", "22z2az", "26z1uza6ka7ia8aa6c", "mim", "x60omw", "a6da6ja81", "mimggogaw", "x60omwggogaw", "a6da6ja81ggogaw", "22z2azi5djyo", "a5pa63a6ba7oa81a6da61a7si5djyo", "ny1kbmoiyjo5i5djyo", "mimi5djyo", "x60omwi5djyo", "a6da6ja81i5djyo", "a69a7ea8aa6ja8aa6da61a7si5djyo", "a71a76a89a6ra71a76ssjvf0", "a5ya5ta81a6ja8a", "wg4mq1a5ya5ta81a6ja8a", "koloqk", "a6ka7ia8aa6ctuun0c", "a4ca3qa4q", "tdvu40", "a82a5oa7ra6d", "hjriki", "a6ta7ua6na78o50", "gk222z2az", "wck22z2az", "a77a7ta5ra63lcx", "ny1kbmoiyjo5lcx", "a67a81a7dl6x", "u49l06lcx", "hmol91", "l73", "r58tsi", "helgk7", "h0fgk7", "a7qa81a6ka7h", "jalk3a", "wck22z2az", "gk222z2az", "wckl5fl06", "gk2vdkjyg", "2tz36z33z36z39z1nz2xz39z2vz2vz35z1oz", "glgogwo50", "gxngyijra", "i5dl6x", "j7utbr", "l73a6da61a7s", "u40jo5l5fl06", "wg4mq1", "28z36z1bz", "r94", "a77a7ta5ra63", "hjrh6y"];

  function n(a) {
    return i(t[a - 1])
  }

  function i(a) {
    return a[o(27)](/.{1,3}/g)[o(28)](a => String[o(30)](window[o(31)](a[o(32)](/z$/, ""), 35)))[o(33)]("")
  }
  const r = [n(86), n(87), n(36), n(25), n(26), n(27), n(88), n(89)],
    s = function() {
      const a = document.querySelector("#game_frame").contentWindow[o(43)];
      if (a && a[o(42)]) return a[o(42)];
      throw o(44)
    }()[o(28)](a => {
      const z = a[o(46)],
        t = { 1: n(9), 2: n(10), 3: n(11), 4: n(12) },
        i = a => Number(a)[o(47)]();
      return [{ 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H", 9: "I" }[a[o(37)]], t[z[o(2)]], i(z[o(36)]), i(z[o(48)]), i(z[o(49)]), i(z[o(50)]), i(z[o(51)]), a[o(34)]]
    }),
    c = function(...a) {
      return a[0][o(28)]((z, t) => [...a][o(28)](a => a[t]))
    }(r[o(28)](a => a[o(52)]), ...s[o(28)](a => a[o(28)](a => a[o(52)])))[o(28)](a => Math[o(53)](...a[o(54)](a => a))),
    u = (a, z) => Number(a) ? Number(a)[o(47)]()[o(55)](z, " ") : a[o(56)](z, " ");
  (a => console.log("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s", ...r[o(28)]((z, o) => u(z, a[o]))))(c), (a => s[o(57)](z => {
    console.log("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s", ...z[o(28)]((z, o) => u(z, a[o])))
  }))(c)
})();
