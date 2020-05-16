
#$keys = "surprise","tread","trench","overview","glasses","amber","fraction","arrogant","duty","nature","academy","land","separate","experience","poetry","heel";
#$values = "open","tribute","presence","official","mirror","paragraph","mechanical","appear","chance","exchange","keep","style","concern","project","underline","degree";

#Get-Random $keys -count 1

[string[]]$keys = Get-Content -Path 'keys.txt'
[string[]]$values = Get-Content -Path 'values.txt'

foreach ($k in $keys) {
    $v = Get-Random $values -count 1;
    $json = ConvertTo-Json @{"$k" = "$v"};
    
    iwr -Body $json -H @{"Content-Type" = "application/json"} -Uri "http://127.0.0.1:3000/" -Method "Post"
}

