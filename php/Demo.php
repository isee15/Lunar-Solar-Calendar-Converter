<?php
/**
 * Created by PhpStorm.
 * User: isee15
 * Date: 15/1/14
 * Time: 下午1:04
 */

define('__ROOT__', (dirname(__FILE__)));
require_once(__ROOT__ . '/LunarSolarConverter.class.php');

$solar = new Solar();
$solar->solarYear = 2015;
$solar->solarMonth = 1;
$solar->solarDay = 14;
$lunar = LunarSolarConverter::SolarToLunar($solar);
var_dump($solar);
var_dump($lunar);
$solar = LunarSolarConverter::LunarToSolar($lunar);
var_dump($solar);
var_dump($lunar);