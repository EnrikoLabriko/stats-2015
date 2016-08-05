class LibraryController < WebController

  ...

  def stats_2015
    if I18n.locale.to_s == 'ru'
        @title = 'Все книжные хиты и антихиты года'
        @meta = 'Все книжные хиты и антихиты года'
    elsif I18n.locale.to_s == 'es'
        @title = 'Que se leyó este año'
        @meta = 'Donde y como leyeron nuestros usuarios'
    elsif I18n.locale.to_s == 'id'
        @title = 'Sudah melihat Laporan Bookmate untuk tahun 2015?'
        @meta = 'Coba amati kebiasaan membaca pengguna Bookmate dalam 12 bulan terakhir!'
    else
        @title = 'Seen Bookmate’s 2015 Report?'
        @meta = 'Seen Bookmate’s 2015 Report?'
    end

    @no_promo_banner = true
    @layout_css_class = 'bm-stats-2015'
    @header_item = 'stats_2015'
    @body_class = 'stats-2015'

    if params[:hr].present?
      @og_image = if I18n.locale == :ru
        "https://assets.bookmate.com/assets/read_hours_2015/ru/#{params[:hr]}.png"
      else
        "https://assets.bookmate.com/assets/read_hours_2015/en/#{params[:hr]}.png"
      end
    end

    # Books

    map_books_uuids_ru = %w(Dv6mygLC uBzW8JWK L4eU3q7k YhPT3dIj MWxAop5b XfnBfO76 p5QpofRA PLxGSPTE qYUfzbtG vlhIw96o yMUvpsDM MwwN4p77 RzwZ8q24 x9LcoS30 iH4Nsgwc ATv8ptOc CLNU473s tMGqVJ4k lNBohlOL JVyYpRoF Slbl4LdH PyU13034 NTSAjljG rP73Kaw8 u8w2lKRI A7ltwXCl EPLz6s34 kYUhLsoa VxyuBV4C al0Ermj3 Snbp8K4X OzPWd3Ql kKZvCjYk MSicbeeo h7MR0fmL yG1zMsEd Qiip6JZZ l3uyFfup e2bZBbuf JFfWm8Kd ct5Lyhcx s0ctNFDE M5lLKIbN v0pjeMxn JAPMElq0 wPoV85mb eGfhig7M B6xYgKXU MajFOZZk FvpfS5Rp OBIJsi99 JQ8SFnN3 wugqn0Us XQLvSa48 CQWyL6jp hGOxuN7x q3N3EsCk INX13int I7avKzEX qakTbalv AILSi1cf ILQxt426 dCqqm3sl EWSuk4cq vet9KIm9)
    map_books_uuids_en = %w(kX2S5pmt XfnBfO76 BDFYpZru qYUfzbtG vlhIw96o yMUvpsDM u1iIEcJd taMKJV31 tMGqVJ4k lNBohlOL JVyYpRoF Slbl4LdH PyU13034 qcarxHx7 rP73Kaw8 u8w2lKRI A7ltwXCl EPLz6s34 qxgjXt08 al0Ermj3 Snbp8K4X Wu0F0pYv kKZvCjYk MSicbeeo h7MR0fmL Ad7v32sC Qiip6JZZ JFfWm8Kd ct5Lyhcx s0ctNFDE JAPMElq0 wPoV85mb eGfhig7M FvpfS5Rp doOaLkuy wugqn0Us XQLvSa48 hGOxuN7x q3N3EsCk I7avKzEX qakTbalv vet9KIm9)

    most_popular_uuids_en = %w(yXCLqcG4 tMGqVJ4k lNBohlOL al0Ermj3 Slbl4LdH JFfWm8Kd QcPhifUF L3NmhbbN kX2S5pmt fOugPsLx)
    most_popular_uuids_es = %w(otp8g286 wJEWyO21 ltwpUcDM PNRohjkb VcbS7dgh)
    most_popular_uuids_id = %w(ag7S6RmT eGfhig7M dbVT9Ljp rl9a3S7k eOaDsYzd)
    most_finished_uuids = %w(nwbQvIDt L4eU3q7k yG1zMsEd MwwN4p77 sWz8sAWR)
    most_unfinished_uuids = %w(mbepiRyF JxCQ4bam TFTPsl9e NODBo1f0 TPPT6j0s)
    most_interesting_uuids = %w(o1o52NjU VxyuBV4C IRInDaCY PLxGSPTE PQ1YAIum)

    most_impressed_uuids_ru = %w(PLxGSPTE UJXEirbe MwwN4p77 VxyuBV4C AwwHcnkj o20vBdpD BJDNCQ9O KWCuuc8b NXEN55hl OUzRk5f8)
    most_impressed_uuids_en = %w(Slbl4LdH kFbT6EYR yXCLqcG4 OM5hTmhY qDRuDoma ai4nPN3K LocueAQy CZdw3Y6w fOugPsLx HZS2bUKj)
    most_impressed_uuids_es = %w(veanoHFl DcyR7Aoy Hk41XdFH FEj8y5H3 IEC6a9iM NNBgdKST Du6xqP1e AcUL7IqC vJMat0T6 QGRF3t2j)
    most_impressed_uuids_id = %w(HoHLqePt pgxeoimN A7ltwXCl bzjztNLy iJXkUafb OnFoqhyn AgiZBvkW kxjV40bP OFhDbO84 XC3agHnT)

    most_cited_uuids_ru = %w(TXGRits7 vQhLuggU wDBDo7m9 AwXG5bhe MwwN4p77)
    most_cited_uuids_es = %w(zGkwfb4f aOHsPBco RCcjNgbw K99iQ9ao eq1thp8i)
    most_cited_uuids_id = %w(bF16cKm3 Sn8SsQVZ qZFnTWc1 jsMHiYre pXYJF0mC)
    most_cited_uuids_en = %w(oElcNzhc TgWzTq1F qDRuDoma fHXdJiOn XQLvSa48)

    most_furtively_uuids = %w(KFxuh9iq ECIxdk9b KPREoigf HvHCkboe whMmMDCC)
    best_uuids = %w(KFxuh9iq ECIxdk9b KPREoigf HvHCkboe whMmMDCC)
    best_covers_uuids_ru = %w(VxyuBV4C yRDIfhdC rsJsqJPb D1g6Nqfh iEecnKfv JStZmiKM gZAxWa0b Rhuzd4QW fjQ7Npts BrJY2cAm)
    best_covers_uuids_en = %w(daiAkFqG Ch1bPnqm GUL3jjco JdLwXUl4 zPu6B94C oPdzSV98 D4aYizDE TJiYn7WP RFU3aLrq xnpzxkZ8)

    most_popular_w_men_uuids = %w(xln03Q68 WYvX6jao Soo76LBP DSCBeghk f5EOBWvS Gi97mBsI)
    most_popular_w_women_uuids = %w(QJHA2jUc bllGsEOJ hGOHuIf6 DMsGqchq M5lLKIbN rZRVUnMo)
    most_popular_general_uuids = %w(jBROtxof D83CI8XG PIW12cn2 tgTeb5Zn RBqcCTl7 HAIXcmjs UEV36FbX WDGtjeKN I4PDgogx)

    fiction_uuids_ru = %w(DokfBcVK ORjRn6YT a5GKVd4n WgRHLiJ5 dTifNFPn ehuqOGtE BJDNCQ9O IgRyTnDX yRDIfhdC ToCPlx1W)
    fiction_uuids_en = %w(tvZXxjgd mBgtiwsa E4ieIt9v hhIXe4Oj sbhH1lbc WDV0B7xM jFbg8L5x uOo2qjRA Tm1l5uo7 j80luPXl)
    fiction_uuids_es = %w(HgWHHK7v Uehf1fOO Lavx1MG3 i07vNOeD TrL3bslf)
    fiction_uuids_id = %w(caofIdnI FRZ1dNjR Kw5xneII IqPhkYye dbVT9Ljp ag7S6RmT A7ltwXCl pXYJF0mC HydPe9zO OFhDbO84)
    non_fiction_uuids_en = %w(xeanHVX9 GufbaE1E a7ccDlWc NDwIqNqh wXXY9tLk)
    non_fiction_uuids_es = %w(FHZf7oMr cuCapzlz GVPVnHKr gwTPcT9i W0HsYdyq)
    documentary_uuids = %w(aLjv4qzO gTK3Rd0u Vqd7aOvm I0g2YhOp oOV6uEh2)
    business_uuids_ru = %w(mekHgJGK jd2GJdEl AOxid1vT xni6bfiZ y0Ym7oId)
    business_uuids_id = %w(aZKzEcaf VXJjaWmM RUdTQQd3 PczJ7coo EYhZALvy)
    childrens_books_uuids_ru = %w(PrP1GAFH RfxwUiFF PWq5rqmV QXG61xJg IRbVHjqt)
    childrens_books_uuids_en = %w(CCccJgXz u8RtonaR Zi6vZfvh cI4H2afu pUf3v6Hy)
    childrens_books_uuids_id = %w(upkLoMgc Kc9D4vbR UevLyOcP WhQGcZLF ttgbcccq)
    local_books_uuids = %w(VsvhHFJe X3cMKyZO Uehf1fOO BIggkSoI Fa7gE5FH)
    tnp_books_uuids = %w(I4PDgogx MD7afOCu Df8lANtg lh1V5z3f n8EdrnFr UuOKgAle e9QvToE5 EnNKYhM9 mbWRVJGM vlAxkqU6)

    if I18n.locale.to_s == 'ru'
        @map_books = books_for_uuids map_books_uuids_ru
    else
        @map_books = books_for_uuids map_books_uuids_en
    end

    if I18n.locale.to_s == 'es'
        @most_popular = books_for_uuids most_popular_uuids_es
    elsif I18n.locale.to_s == 'id'
        @most_popular = books_for_uuids most_popular_uuids_id
    else
        @most_popular = books_for_uuids most_popular_uuids_en
    end

    @most_popular_en = books_for_uuids most_popular_uuids_en
    @most_popular_es = books_for_uuids most_popular_uuids_es
    @most_popular_id = books_for_uuids most_popular_uuids_id
    @most_finished = books_for_uuids most_finished_uuids
    @most_unfinished = books_for_uuids most_unfinished_uuids
    @most_interesting = books_for_uuids most_interesting_uuids

    if I18n.locale.to_s == 'ru'
        @most_impressed = books_for_uuids most_impressed_uuids_ru
    elsif I18n.locale.to_s == 'es'
        @most_impressed = books_for_uuids most_impressed_uuids_es
    elsif I18n.locale.to_s == 'id'
        @most_impressed = books_for_uuids most_impressed_uuids_id
    else
        @most_impressed = books_for_uuids most_impressed_uuids_en
    end

    if I18n.locale.to_s == 'ru'
        @most_cited = books_for_uuids most_cited_uuids_ru
    elsif I18n.locale.to_s == 'es'
        @most_cited = books_for_uuids most_cited_uuids_es
    elsif I18n.locale.to_s == 'id'
        @most_cited = books_for_uuids most_cited_uuids_id
    else
        @most_cited = books_for_uuids most_cited_uuids_en
    end

    @most_furtively = books_for_uuids most_furtively_uuids

    @best_books = books_for_uuids best_uuids

    if I18n.locale.to_s == 'ru'
        @best_covers = books_for_uuids best_covers_uuids_ru
    else
        @best_covers = books_for_uuids best_covers_uuids_en
    end

    @most_popular_w_men = books_for_uuids most_popular_w_men_uuids
    @most_popular_w_women = books_for_uuids most_popular_w_women_uuids

    if I18n.locale.to_s == 'ru'
        @fiction = books_for_uuids fiction_uuids_ru
    elsif I18n.locale.to_s == 'es'
        @fiction = books_for_uuids fiction_uuids_es
    elsif I18n.locale.to_s == 'id'
        @fiction = books_for_uuids fiction_uuids_id
    else
        @fiction = books_for_uuids fiction_uuids_en
    end

    if I18n.locale.to_s == 'es'
        @non_fiction = books_for_uuids non_fiction_uuids_es
    else
        @non_fiction = books_for_uuids non_fiction_uuids_en
    end

    if I18n.locale.to_s == 'ru'
        @business = books_for_uuids business_uuids_ru
    else
        @business = books_for_uuids business_uuids_id
    end

    @documentary = books_for_uuids documentary_uuids

    if I18n.locale.to_s == 'ru'
        @childrens_books = books_for_uuids childrens_books_uuids_ru
    elsif I18n.locale.to_s == 'id'
        @childrens_books = books_for_uuids childrens_books_uuids_id
    else
        @childrens_books = books_for_uuids childrens_books_uuids_en
    end

    @local_books = books_for_uuids local_books_uuids

    @tnp_books = books_for_uuids tnp_books_uuids

    @most_popular_in_cities = {
      moscow: books_for_uuids(most_popular_general_uuids[0]),
      stpetersburg: books_for_uuids(most_popular_general_uuids[1]),
      ekaterinburg: books_for_uuids(most_popular_general_uuids[2]),
      perm: books_for_uuids(most_popular_general_uuids[3]),
      tomsk: books_for_uuids(most_popular_general_uuids[4])
    }

    @most_popular_by_season = {
      winter: books_for_uuids(most_popular_general_uuids[5]),
      spring: books_for_uuids(most_popular_general_uuids[6]),
      summer: books_for_uuids(most_popular_general_uuids[7]),
      autumn: books_for_uuids(most_popular_general_uuids[8])
    }

    # Lists

    selected_lists_uuids = %w(ohPepYxJ kGZ6kq3z Swx12t81 CbzIDYaH)

    @selected_lists = lists_for_uuids selected_lists_uuids

    # Bookshelves

    users_bookshelves_uuids_ru = %w(v6GoqAeW K9cddiWr XMJAiVCy PDH1Dlf9 nMJNBkPQ cYboO0bd)
    users_bookshelves_uuids_en = %w(eVbU3vWQ xi5cFa0W gRDMOanv kTBSuMY2 SNIb9Hko QoGeNASs)
    users_bookshelves_uuids_es = %w(uCTN9gYS ZdrxoHD8 RNs6uJwG)
    users_bookshelves_uuids_id = %w(YmSc2sU0 f7G8bj3c GKKLz4jz J1MVlgyQ fr25GHWU hdwQLQ4s)

    if I18n.locale.to_s == 'ru'
        @user_bookshelves = bookshelves_for_uuids users_bookshelves_uuids_ru
    elsif I18n.locale.to_s == 'es'
        @user_bookshelves = bookshelves_for_uuids users_bookshelves_uuids_es
    elsif I18n.locale.to_s == 'id'
        @user_bookshelves = bookshelves_for_uuids users_bookshelves_uuids_id
    else
        @user_bookshelves = bookshelves_for_uuids users_bookshelves_uuids_en
    end

    render layout: '_web_2'
  end

  private

  def ...

    ...

  end

  ...

end
