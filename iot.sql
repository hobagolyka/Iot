-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2016. Dec 07. 14:59
-- Kiszolgáló verziója: 5.7.16-log
-- PHP verzió: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `iot`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `devices`
--

CREATE TABLE `devices` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` text NOT NULL,
  `CORD1` text NOT NULL,
  `CORD2` text NOT NULL,
  `ADDRESS` text NOT NULL,
  `TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DATA` text NOT NULL,
  `IP` text NOT NULL,
  `TYPE` text NOT NULL,
  `OIDS` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `devices`
--

INSERT INTO `devices` (`ID`, `NAME`, `CORD1`, `CORD2`, `ADDRESS`, `TS`, `DATA`, `IP`, `TYPE`, `OIDS`) VALUES
(11, 'Aszofo Home Core', '46.927445', '17.828548599999976', 'aszófő vadvirág utca 1', '2016-11-26 18:24:16', '', '91.226.79.140', 'Router', ''),
(13, 'Bix teszt', '47.497912', '19.04023499999994', 'budapest', '2016-11-27 16:08:13', 'teszt bla bla', '91.226.79.1', 'Egyéb', '1.3.6.1.2.1.1.5.0, 1.3.6.1.2.1.1.6.0'),
(15, 'teszt1', '46.9599039', '17.88512019999996', 'balatonfüred', '2016-12-06 17:34:12', '', '123.456.78.9', 'Switch', ''),
(16, 'teszt2', '46.9658557', '17.827276100000063', 'balatonszöllőt', '2016-12-06 17:35:57', '', '987.654.43.2', 'Router', ''),
(17, 'teszt3', '46.9403118', '17.757502700000032', 'vászoly', '2016-12-06 17:36:34', '', '', 'Router', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `oidlista`
--

CREATE TABLE `oidlista` (
  `ID` int(11) NOT NULL,
  `NAME` text NOT NULL,
  `OID` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `oidlista`
--

INSERT INTO `oidlista` (`ID`, `NAME`, `OID`) VALUES
(1, 'Device name', '1.3.6.1.2.1.1.1.0'),
(2, 'OID for enterprise', '1.3.6.1.2.1.1.2.0'),
(4, 'Timeticks', '1.3.6.1.2.1.1.3.0'),
(7, 'Contact', '1.3.6.1.2.1.1.4.0'),
(10, 'System name', '1.3.6.1.2.1.1.5.0'),
(11, 'Location', '1.3.6.1.2.1.1.6.0');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `USER` text NOT NULL,
  `PW` text NOT NULL,
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`USER`, `PW`, `ID`) VALUES
('admin', 'alma', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `oidlista`
--
ALTER TABLE `oidlista`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `devices`
--
ALTER TABLE `devices`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT a táblához `oidlista`
--
ALTER TABLE `oidlista`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
