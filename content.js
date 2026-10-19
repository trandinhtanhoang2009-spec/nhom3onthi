/*
 * Nội dung học tập tự biên soạn, tham khảo Chương trình GDPT 2018 và cấu trúc
 * kỳ thi tốt nghiệp THPT do Bộ GDĐT công bố. Không phải đề thi chính thức.
 * Chỉnh sửa/thêm bài ở đây nếu muốn cập nhật nội dung cho tất cả người dùng.
 */
window.STUDY_DATA = {
  subjects: [
    {
      id: "math",
      name: "Toán",
      short: "TOÁN",
      icon: "∑",
      color: "blue",
      badge: "BẮT BUỘC",
      exam: "90 phút · trắc nghiệm",
      summary: "Nắm cách làm, hiểu vì sao đúng, rồi luyện từ dễ đến vừa.",
      skills: ["Hàm số", "Mũ – logarit", "Tích phân", "Xác suất"]
    },
    {
      id: "literature",
      name: "Ngữ văn",
      short: "VĂN",
      icon: "Aa",
      color: "coral",
      badge: "BẮT BUỘC",
      exam: "120 phút · tự luận",
      summary: "Đọc đúng yêu cầu, tìm ý rõ ràng, viết bằng tiếng nói của mình.",
      skills: ["Đọc hiểu", "Nghị luận xã hội", "Nghị luận văn học", "Viết"]
    },
    {
      id: "english",
      name: "Tiếng Anh",
      short: "ANH",
      icon: "A–Z",
      color: "green",
      badge: "TỰ CHỌN",
      exam: "50 phút · trắc nghiệm",
      summary: "Ôn ngữ pháp trong ngữ cảnh, từ vựng theo cụm và đọc có chiến lược.",
      skills: ["Ngữ pháp", "Từ vựng", "Đọc hiểu", "Liên kết câu"]
    },
    {
      id: "informatics",
      name: "Tin học",
      short: "TIN HỌC",
      icon: "</>",
      color: "violet",
      badge: "TỰ CHỌN",
      exam: "50 phút · trắc nghiệm",
      summary: "Hiểu thuật toán, dữ liệu và cách dùng công nghệ an toàn, có trách nhiệm.",
      skills: ["Thuật toán", "Python cơ bản", "Dữ liệu", "An toàn số"]
    }
  ],
  lessons: [
    {
      id: "math-derivative",
      subject: "math",
      category: "Giải tích",
      title: "Đạo hàm và khảo sát hàm số",
      subtitle: "Đọc chiều biến thiên, tìm cực trị và hiểu đồ thị.",
      minutes: 18,
      level: "Nền tảng",
      goal: "Biết dùng đạo hàm để kết luận hàm số tăng, giảm; tìm điểm cực trị và xử lý bài toán tiếp tuyến cơ bản.",
      sections: [
        {
          heading: "1. Ý tưởng cốt lõi",
          body: "Đạo hàm f′(x) cho biết hàm số đang tăng hay giảm tại từng khoảng. Trên một khoảng, nếu f′(x) > 0 thì f tăng; nếu f′(x) < 0 thì f giảm. Điểm f′(x) = 0 chỉ là điểm cần kiểm tra, chưa chắc là cực trị.",
          bullets: ["Tìm tập xác định trước.", "Giải f′(x) = 0 và tìm nơi f′(x) không xác định nhưng f xác định.", "Lập bảng dấu f′(x), rồi mới kết luận."]
        },
        {
          heading: "2. Quy trình khảo sát gọn",
          body: "Với câu hỏi về cực trị hoặc khoảng đơn điệu, không cần khảo sát mọi thứ. Làm theo thứ tự này để tránh sót:",
          bullets: ["Tính đạo hàm và rút gọn.", "Tìm nghiệm tới hạn.", "Thử dấu đạo hàm ở từng khoảng.", "Kết luận tăng/giảm; xét đổi dấu để xác định cực đại, cực tiểu.", "Thay điểm vào hàm số nếu đề hỏi tọa độ cực trị."]
        },
        {
          heading: "3. Ví dụ minh họa",
          example: "Cho f(x) = x² − 4x + 1. Hàm số đạt cực tiểu tại đâu?",
          solution: "f′(x) = 2x − 4. Giải f′(x) = 0 được x = 2. Khi x < 2 thì f′(x) < 0; khi x > 2 thì f′(x) > 0. Hàm giảm rồi tăng, nên có cực tiểu tại x = 2. Giá trị cực tiểu là f(2) = −3.",
          takeaway: "Mẹo nhớ: đạo hàm đổi dấu từ âm sang dương → cực tiểu; từ dương sang âm → cực đại."
        }
      ],
      keywords: ["đạo hàm", "cực trị", "đơn điệu", "bảng biến thiên"]
    },
    {
      id: "math-exp-log",
      subject: "math",
      category: "Mũ – logarit",
      title: "Hàm số mũ, logarit và phương trình",
      subtitle: "Điều kiện xác định, quy tắc biến đổi và cách so sánh.",
      minutes: 16,
      level: "Nền tảng",
      goal: "Nhận dạng điều kiện của logarit, vận dụng các quy tắc mũ – logarit và kiểm tra nghiệm ngoại lai.",
      sections: [
        {
          heading: "1. Ba điều kiện cần nhớ",
          body: "Với a > 0, a ≠ 1: aˣ luôn dương; logₐx chỉ có nghĩa khi x > 0; logₐ1 = 0 và logₐa = 1.",
          bullets: ["logₐ(MN) = logₐM + logₐN (M, N > 0).", "logₐ(M/N) = logₐM − logₐN.", "logₐ(Mᵏ) = k logₐM.", "Nếu a > 1, hàm aˣ tăng; nếu 0 < a < 1, hàm aˣ giảm."]
        },
        {
          heading: "2. Chọn cách giải phù hợp",
          body: "Nếu hai vế có cùng cơ số, đưa về so sánh số mũ. Nếu biểu thức là logarit, kiểm tra điều kiện trước rồi mới biến đổi. Khi cơ số khác nhau, có thể đổi về cùng cơ số hoặc dùng tính đơn điệu.",
          bullets: ["Ghi điều kiện xác định ở đầu bài.", "Biến đổi tương đương, không chia hai vế cho biểu thức chưa biết dấu.", "Thử lại nghiệm trong phương trình ban đầu."]
        },
        {
          heading: "3. Ví dụ minh họa",
          example: "Giải log₂(x − 1) = 3.",
          solution: "Điều kiện: x − 1 > 0, tức x > 1. Từ định nghĩa logarit: x − 1 = 2³ = 8, nên x = 9. Nghiệm này thỏa điều kiện.",
          takeaway: "Viết điều kiện trước giúp tránh nhận nghiệm không hợp lệ."
        }
      ],
      keywords: ["logarit", "mũ", "phương trình", "điều kiện"]
    },
    {
      id: "math-integral",
      subject: "math",
      category: "Tích phân",
      title: "Nguyên hàm, tích phân và diện tích",
      subtitle: "Nhận dạng công thức và đọc đúng cận tích phân.",
      minutes: 17,
      level: "Trọng tâm",
      goal: "Phân biệt nguyên hàm và tích phân xác định; áp dụng định lý cơ bản và hiểu diện tích hình phẳng.",
      sections: [
        {
          heading: "1. Hai khái niệm",
          body: "F là một nguyên hàm của f nếu F′(x) = f(x). Tích phân xác định ∫ₐᵇ f(x)dx = F(b) − F(a), với F là một nguyên hàm của f.",
          bullets: ["∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C (n ≠ −1).", "∫ 1/x dx = ln|x| + C.", "Tích phân xác định là một số; nguyên hàm có hằng số C."]
        },
        {
          heading: "2. Dấu của diện tích",
          body: "Tích phân có thể âm nếu đồ thị nằm dưới trục hoành. Diện tích hình phẳng giữa y = f(x) và trục Ox là ∫ₐᵇ |f(x)|dx. Nếu f đổi dấu, phải chia khoảng tại nghiệm của f.",
          bullets: ["Xác định giao điểm với Ox.", "Chia khoảng theo các nghiệm.", "Trên mỗi khoảng xét f dương hay âm, rồi lấy diện tích dương."]
        },
        {
          heading: "3. Ví dụ minh họa",
          example: "Tính ∫₀² 3x² dx.",
          solution: "Một nguyên hàm của 3x² là x³. Vì vậy ∫₀² 3x² dx = 2³ − 0³ = 8.",
          takeaway: "Khi tính tích phân xác định, thay cận trên trước, rồi trừ giá trị tại cận dưới."
        }
      ],
      keywords: ["nguyên hàm", "tích phân", "diện tích", "cận"]
    },
    {
      id: "math-probability",
      subject: "math",
      category: "Xác suất – thống kê",
      title: "Xác suất và cách đọc số liệu",
      subtitle: "Đếm trường hợp hợp lý, đọc bảng và hiểu trung bình.",
      minutes: 15,
      level: "Vận dụng",
      goal: "Phân biệt kết quả đồng khả năng, biến cố và tần suất; đọc các số đo đặc trưng của mẫu số liệu.",
      sections: [
        {
          heading: "1. Xác suất cổ điển",
          body: "Nếu các kết quả đồng khả năng, xác suất của biến cố A là P(A) = số kết quả thuận lợi / tổng số kết quả có thể.",
          bullets: ["Liệt kê không gian mẫu Ω.", "Đếm số kết quả thuộc A.", "Kiểm tra 0 ≤ P(A) ≤ 1.", "Biến cố đối: P(Ā) = 1 − P(A)."]
        },
        {
          heading: "2. Trung bình và trung vị",
          body: "Trung bình cộng nhạy với các giá trị quá lớn hoặc quá nhỏ. Trung vị là giá trị đứng giữa sau khi sắp xếp dữ liệu, thường mô tả mức điển hình tốt hơn khi dữ liệu có ngoại lệ.",
          bullets: ["Sắp xếp số liệu trước khi tìm trung vị.", "Nếu số lượng dữ liệu chẵn, lấy trung bình của hai số ở giữa.", "Đọc đơn vị và bối cảnh trước khi diễn giải kết quả."]
        },
        {
          heading: "3. Ví dụ minh họa",
          example: "Một hộp có 3 viên bi đỏ và 2 viên bi xanh. Lấy ngẫu nhiên một viên. Xác suất lấy được bi xanh là bao nhiêu?",
          solution: "Có 5 viên bi như nhau về khả năng được chọn; 2 viên xanh. Vậy P(bi xanh) = 2/5 = 0,4.",
          takeaway: "Mẫu số là tổng số khả năng; tử số là số khả năng thỏa đúng điều cần tìm."
        }
      ],
      keywords: ["xác suất", "trung bình", "trung vị", "dữ liệu"]
    },
    {
      id: "literature-reading",
      subject: "literature",
      category: "Đọc hiểu",
      title: "Đọc hiểu văn bản mới: đọc chậm, trả lời trúng",
      subtitle: "Tìm bằng chứng ngay trong văn bản thay vì đoán ý người ra đề.",
      minutes: 16,
      level: "Trọng tâm",
      goal: "Nhận diện thông tin, cách dùng từ và tác dụng của chi tiết; trả lời đủ ý nhưng không lan man.",
      sections: [
        {
          heading: "1. Đọc theo ba lượt",
          body: "Lượt 1 đọc câu hỏi để biết cần tìm gì. Lượt 2 đọc văn bản và gạch chân từ khóa, hình ảnh, mốc thời gian hoặc sự thay đổi cảm xúc. Lượt 3 đối chiếu từng câu hỏi với đúng đoạn làm bằng chứng.",
          bullets: ["Câu hỏi hỏi thông tin → trích đúng chi tiết.", "Câu hỏi hỏi tác dụng → nêu biện pháp, chỉ ra từ ngữ, rồi nói tác dụng trong ngữ cảnh.", "Câu hỏi hỏi thông điệp → nêu thông điệp và giải thích bằng một lý do cụ thể."]
        },
        {
          heading: "2. Công thức trả lời tác dụng",
          body: "Có thể viết theo nhịp: gọi tên cách viết → dẫn từ/cụm từ cụ thể → nói hình ảnh hoặc cảm xúc được làm nổi bật → liên hệ với ý của đoạn.",
          example: "Ví dụ: Tác giả dùng phép so sánh ở cụm “...” để làm hình ảnh trở nên gần gũi, gợi cảm giác ..., qua đó nhấn mạnh ...",
          takeaway: "Không dừng ở câu “làm câu văn sinh động”; hãy chỉ rõ sinh động ở điểm nào và phục vụ ý gì."
        },
        {
          heading: "3. Kiểm tra câu trả lời",
          body: "Trước khi chuyển câu, tự hỏi: Mình đã trả lời đúng động từ của đề chưa? Có dẫn chứng trong văn bản không? Câu trả lời có quá dài hoặc lặp ý không?",
          bullets: ["Dùng câu đủ chủ ngữ – vị ngữ.", "Không suy diễn vượt quá văn bản.", "Nếu yêu cầu nêu hai ý, đánh dấu đủ cả hai ý."]
        }
      ],
      keywords: ["đọc hiểu", "biện pháp tu từ", "thông điệp", "ngữ liệu"]
    },
    {
      id: "literature-social",
      subject: "literature",
      category: "Nghị luận xã hội",
      title: "Viết đoạn nghị luận xã hội có luận điểm rõ",
      subtitle: "Một ý chính, lý lẽ dễ hiểu và dẫn chứng vừa đủ.",
      minutes: 18,
      level: "Trọng tâm",
      goal: "Viết đoạn nghị luận mạch lạc, thể hiện chính kiến và có ví dụ phù hợp với vấn đề.",
      sections: [
        {
          heading: "1. Khung 5 bước dễ nhớ",
          body: "Mở đoạn nêu vấn đề. Giải thích từ khóa. Bàn luận vì sao vấn đề quan trọng hoặc đáng lo. Dẫn một ví dụ cụ thể. Kết đoạn bằng bài học hay hành động.",
          bullets: ["Không biến đoạn văn thành danh sách khẩu hiệu.", "Mỗi câu nên phục vụ một luận điểm.", "Dẫn chứng có thể từ học tập, đời sống, sách báo; chỉ cần đúng và liên quan."]
        },
        {
          heading: "2. Cách phát triển một ý",
          body: "Dùng nhịp “ý kiến → vì sao → ví dụ → kết nối”. Ví dụ, nếu bàn về thói quen đọc, hãy giải thích đọc giúp điều gì, nêu một tình huống thực tế, rồi quay lại kết luận về giá trị của thói quen ấy.",
          example: "Luận điểm: Biết lắng nghe giúp con người hợp tác tốt hơn. Lý do: ta hiểu nhu cầu của người khác trước khi phản hồi. Ví dụ: nhóm học sinh phân chia việc công bằng hơn khi mọi thành viên được nói.",
          takeaway: "Ví dụ nên ngắn, đúng vấn đề, không cần kể dài."
        },
        {
          heading: "3. Lỗi thường gặp",
          body: "Nêu nhiều ý nhưng không giải thích; dùng dẫn chứng không liên quan; mở đoạn quá dài; kết luận chung chung. Hãy dành một phút gạch ra 3 từ khóa trước khi viết.",
          bullets: ["Luận điểm: mình muốn khẳng định điều gì?", "Lý lẽ: tại sao điều ấy đúng?", "Hành động: người viết hoặc người trẻ có thể làm gì?"]
        }
      ],
      keywords: ["nghị luận xã hội", "luận điểm", "dẫn chứng", "đoạn văn"]
    },
    {
      id: "literature-literary",
      subject: "literature",
      category: "Nghị luận văn học",
      title: "Phân tích văn bản lạ mà không học tủ",
      subtitle: "Bám chi tiết nghệ thuật, cảm xúc và ý nghĩa của đoạn trích.",
      minutes: 19,
      level: "Vận dụng",
      goal: "Tạo bài viết có nhận xét riêng, dùng dẫn chứng chính xác và liên kết hình thức với nội dung.",
      sections: [
        {
          heading: "1. Đi từ chi tiết đến ý nghĩa",
          body: "Đọc kỹ câu chữ, xác định người nói hoặc điểm nhìn, hình ảnh nổi bật, giọng điệu và sự thay đổi trong đoạn. Từ chi tiết cụ thể mới rút ra cảm xúc hoặc chủ đề.",
          bullets: ["Gạch chân từ ngữ gợi cảm giác hoặc hành động.", "Tìm sự tương phản, lặp lại, hình ảnh biểu tượng nếu có.", "Hỏi: chi tiết này giúp người đọc hiểu gì về nhân vật, con người hoặc cuộc sống?"]
        },
        {
          heading: "2. Đoạn phân tích 4 câu",
          body: "Nêu nhận xét → dẫn chi tiết → phân tích cách viết → kết nối với chủ đề. Mỗi dẫn chứng cần có lời giải thích của chính mình, không chỉ chép lại.",
          example: "Đoạn thơ gợi nỗi nhớ qua hình ảnh ... Từ ... tạo cảm giác ... Cách đặt hình ảnh bên cạnh ... làm nổi bật ... Qua đó, người đọc cảm nhận ...",
          takeaway: "Đây là khung hỗ trợ, không phải câu mẫu bắt buộc. Hãy thay bằng chi tiết đúng của văn bản đang đọc."
        },
        {
          heading: "3. Tổ chức bài viết",
          body: "Mở bài giới thiệu vấn đề cần phân tích; thân bài triển khai 2–3 luận điểm theo trình tự hợp lý; kết bài khái quát giá trị và nêu cảm nhận. Không cần kể lại toàn bộ cốt truyện.",
          bullets: ["Mỗi đoạn thân bài có một ý chính.", "Dẫn chứng ngắn và chính xác.", "Kết nối nội dung với hình thức nghệ thuật."]
        }
      ],
      keywords: ["văn học", "phân tích", "dẫn chứng", "điểm nhìn"]
    },
    {
      id: "literature-time",
      subject: "literature",
      category: "Kỹ năng làm bài",
      title: "Chia 120 phút môn Văn thật hợp lý",
      subtitle: "Đọc đề, lập dàn ý và dành thời gian soát bài.",
      minutes: 10,
      level: "Kỹ năng",
      goal: "Tạo kế hoạch thời gian cá nhân, tránh bỏ trống câu hoặc viết quá dài ở phần đầu.",
      sections: [
        {
          heading: "1. Một lịch tham khảo",
          body: "Tổng thời gian làm bài là 120 phút. Có thể dùng khoảng 20 phút cho đọc hiểu, 25 phút cho đoạn nghị luận xã hội, 65 phút cho bài nghị luận văn học và 10 phút để đọc lại. Đây là gợi ý; hãy điều chỉnh theo cấu trúc đề và điểm số ghi trên đề thi.",
          bullets: ["Đọc toàn đề và khoanh động từ yêu cầu.", "Dành 2–4 phút lập dàn ý cho bài dài.", "Chừa vài phút cuối để sửa lỗi và kiểm tra đủ câu."]
        },
        {
          heading: "2. Khi bí ý",
          body: "Quay về từ khóa của đề, nêu một nhận xét nhỏ có thể chứng minh bằng văn bản. Tránh cố viết câu thật hoa mỹ khi ý chưa rõ.",
          bullets: ["Mình đang được hỏi về điều gì?", "Chi tiết nào trong văn bản giúp trả lời?", "Từ chi tiết đó có thể rút ra nhận xét nào?"]
        }
      ],
      keywords: ["120 phút", "quản lý thời gian", "lập dàn ý"]
    },
    {
      id: "english-grammar",
      subject: "english",
      category: "Ngữ pháp",
      title: "Ngữ pháp cốt lõi trong câu dài",
      subtitle: "Tìm chủ ngữ, động từ chính rồi mới chọn đáp án.",
      minutes: 18,
      level: "Nền tảng",
      goal: "Nhận diện thì, hòa hợp chủ-vị, bị động, mệnh đề quan hệ và câu điều kiện trong ngữ cảnh.",
      sections: [
        {
          heading: "1. Tìm khung câu trước",
          body: "Một câu dài có thể có nhiều cụm bổ sung. Hãy tìm chủ ngữ chính và động từ chính trước, sau đó mới xét thì và dạng từ.",
          bullets: ["Chủ ngữ số ít thường đi với động từ số ít ở hiện tại đơn.", "Hiện tại hoàn thành: have/has + past participle; thường gắn với trải nghiệm hoặc việc còn liên quan hiện tại.", "Bị động: be + past participle; dùng khi đối tượng chịu tác động được nhấn mạnh."]
        },
        {
          heading: "2. Mệnh đề quan hệ và điều kiện",
          body: "Who thường thay cho người; which cho vật; that có thể dùng cho người hoặc vật trong mệnh đề xác định. Câu điều kiện loại 1 thường nói khả năng có thật: If + hiện tại đơn, will + động từ nguyên mẫu.",
          example: "The student who won the prize is my friend. / If it rains, we will stay at home.",
          takeaway: "Đừng chọn đáp án chỉ vì thấy một từ quen; hãy kiểm tra ngữ pháp của cả câu."
        },
        {
          heading: "3. Chiến lược chọn đáp án",
          body: "Đọc đủ câu, xác định dấu hiệu thời gian, chủ ngữ và quan hệ ý nghĩa. Thử từng lựa chọn vào câu; loại đáp án sai hòa hợp hoặc sai dạng động từ.",
          bullets: ["Đọc phần trước và sau chỗ trống.", "Kiểm tra chủ động hay bị động.", "Kiểm tra dạng từ cần điền: danh từ, động từ, tính từ hay trạng từ."]
        }
      ],
      keywords: ["thì", "bị động", "mệnh đề quan hệ", "điều kiện"]
    },
    {
      id: "english-vocab",
      subject: "english",
      category: "Từ vựng",
      title: "Học từ vựng theo cụm, không học rời",
      subtitle: "Nhớ cách dùng, từ loại và từ đi cùng nhau.",
      minutes: 14,
      level: "Nền tảng",
      goal: "Đoán nghĩa từ theo ngữ cảnh, nhận ra từ loại và dùng collocation cơ bản.",
      sections: [
        {
          heading: "1. Ghi một từ thành một cụm",
          body: "Thay vì ghi riêng “decision”, hãy ghi “make a decision”. Ghi cả ví dụ ngắn và từ loại giúp nhớ cách dùng trong câu.",
          bullets: ["make a decision / take action", "be interested in + danh từ hoặc V-ing", "an important change: tính từ đứng trước danh từ"]
        },
        {
          heading: "2. Đoán nghĩa bằng ngữ cảnh",
          body: "Đọc câu trước và sau để tìm ví dụ, từ trái nghĩa, giải thích hoặc nguyên nhân – kết quả. Sau đó thay từ cần đoán bằng nghĩa dự kiến và xem câu có hợp lý không.",
          example: "The path was slippery after the rain, so Mia walked slowly. Từ slippery có thể đoán là trơn vì câu cho biết Mia đi chậm sau cơn mưa.",
          takeaway: "Không biết một từ không có nghĩa là mất cả câu: hãy dùng manh mối xung quanh."
        },
        {
          heading: "3. Ôn lại theo nhịp ngắn",
          body: "Ôn từ mới sau một ngày, ba ngày và một tuần. Tự che nghĩa tiếng Việt rồi đặt một câu mới.",
          bullets: ["Học 8–12 cụm mỗi lượt.", "Đặt câu liên quan cuộc sống của mình.", "Ghi lại từ dễ nhầm cùng ví dụ đối chiếu."]
        }
      ],
      keywords: ["từ vựng", "collocation", "từ loại", "ngữ cảnh"]
    },
    {
      id: "english-reading",
      subject: "english",
      category: "Đọc hiểu",
      title: "Đọc nhanh nhưng không bỏ mất ý",
      subtitle: "Skim để hiểu chủ đề, scan để tìm bằng chứng.",
      minutes: 15,
      level: "Trọng tâm",
      goal: "Tìm ý chính, thông tin cụ thể, từ tham chiếu và nghĩa của từ trong đoạn văn.",
      sections: [
        {
          heading: "1. Skim và scan",
          body: "Skim là đọc lướt tiêu đề, câu đầu/cuối để hiểu chủ đề. Scan là tìm tên riêng, con số hoặc từ khóa trong câu hỏi. Sau đó đọc kỹ vùng có bằng chứng.",
          bullets: ["Đọc câu hỏi trước, gạch từ khóa.", "Không dịch từng từ trong cả đoạn.", "Đánh dấu câu chứa bằng chứng cho mỗi lựa chọn."]
        },
        {
          heading: "2. Tìm ý chính và từ tham chiếu",
          body: "Ý chính thường bao quát cả đoạn, không chỉ nhắc lại một chi tiết nhỏ. Với it, they, this, these, nhìn lại danh từ hoặc ý gần nhất phù hợp về số và nghĩa.",
          example: "Nếu câu nói “These solutions are affordable”, tìm danh từ số nhiều ở câu trước để biết these solutions đang thay cho điều gì.",
          takeaway: "Đáp án đúng phải có bằng chứng trong bài; cảnh giác đáp án đúng một nửa nhưng thêm thông tin không được nêu."
        },
        {
          heading: "3. Chọn đáp án loại trừ",
          body: "Loại phương án trái với bài, quá rộng, quá hẹp hoặc dựa vào kiến thức bên ngoài. Sau cùng so sánh hai phương án còn lại với đúng câu bằng chứng.",
          bullets: ["Đúng theo bài ≠ đúng theo điều mình biết ngoài đời.", "Từ gần nghĩa cần phù hợp ngữ cảnh.", "Nếu phân vân, quay lại dòng có bằng chứng."]
        }
      ],
      keywords: ["đọc hiểu", "skim", "scan", "ý chính"]
    },
    {
      id: "english-linking",
      subject: "english",
      category: "Liên kết câu",
      title: "Sắp xếp câu và chọn từ nối",
      subtitle: "Theo dõi trình tự thời gian và mối quan hệ ý.",
      minutes: 13,
      level: "Vận dụng",
      goal: "Sắp xếp câu thành đoạn hợp lý và chọn từ nối đúng quan hệ nguyên nhân, đối lập, bổ sung.",
      sections: [
        {
          heading: "1. Tìm câu mở đầu",
          body: "Câu mở đầu thường giới thiệu chủ đề, người hoặc tình huống. Câu có đại từ như he, they, this thường cần một câu trước để chỉ rõ đối tượng.",
          bullets: ["Tìm câu giới thiệu chủ đề chung.", "Tìm cặp câu có từ lặp hoặc đại từ thay thế.", "Dựa vào first, then, finally để nhận ra trình tự."]
        },
        {
          heading: "2. Chọn từ nối theo quan hệ",
          body: "Because nêu lý do; therefore nêu kết quả; however báo hiệu đối lập; moreover thêm ý cùng chiều; for example đưa ví dụ.",
          example: "The bus was late. Therefore, we arrived after the meeting began. (Xe buýt đến muộn, vì vậy chúng tôi đến sau khi cuộc họp bắt đầu.)",
          takeaway: "Thử đọc cả hai vế để xem quan hệ ý có đúng với từ nối không."
        }
      ],
      keywords: ["từ nối", "sắp xếp câu", "đoạn văn"]
    },
    {
      id: "informatics-algorithm",
      subject: "informatics",
      category: "Thuật toán",
      title: "Thuật toán: chia nhỏ bài toán",
      subtitle: "Input, xử lý, output và kiểm tra trường hợp biên.",
      minutes: 17,
      level: "Nền tảng",
      goal: "Mô tả quy trình giải bài toán, theo dõi điều kiện và vòng lặp bằng ví dụ đơn giản.",
      sections: [
        {
          heading: "1. Ba phần của bài toán",
          body: "Input là dữ liệu đưa vào; xử lý là các bước biến đổi; output là kết quả cần đưa ra. Thuật toán là một dãy bước rõ ràng, hữu hạn và có thể thực hiện.",
          bullets: ["Viết rõ dữ liệu đã biết và điều cần tìm.", "Tách bài toán thành bước nhỏ.", "Thử bằng một dữ liệu nhỏ trước khi áp dụng dữ liệu lớn."]
        },
        {
          heading: "2. Điều kiện và vòng lặp",
          body: "Câu lệnh điều kiện chọn nhánh theo đúng/sai. Vòng lặp lặp lại thao tác; cần có điều kiện dừng để chương trình không chạy mãi.",
          example: "Tính tổng các số từ 1 đến 4: bắt đầu S = 0; lần lượt cộng 1, 2, 3, 4 vào S; kết quả cuối là 10.",
          takeaway: "Với vòng lặp, kiểm tra số lần lặp, giá trị bắt đầu và điều kiện dừng."
        },
        {
          heading: "3. Thử trường hợp biên",
          body: "Trường hợp biên là đầu mút hoặc tình huống đặc biệt: danh sách rỗng, số nhỏ nhất, số lớn nhất, dữ liệu chỉ có một phần tử.",
          bullets: ["Có dữ liệu rỗng không?", "Có phần tử trùng không?", "Điều kiện dừng có bị bỏ qua hoặc lặp vô hạn không?"]
        }
      ],
      keywords: ["thuật toán", "input", "output", "vòng lặp"]
    },
    {
      id: "informatics-python",
      subject: "informatics",
      category: "Lập trình cơ bản",
      title: "Python cơ bản: biến, danh sách và hàm",
      subtitle: "Đọc từng dòng lệnh và theo dõi giá trị thay đổi.",
      minutes: 18,
      level: "Nền tảng",
      goal: "Hiểu biến, kiểu dữ liệu, chỉ số danh sách, câu lệnh điều kiện và hàm ở mức nhập môn.",
      sections: [
        {
          heading: "1. Biến và kiểu dữ liệu",
          body: "Biến là tên gắn với một giá trị. Các kiểu thường gặp gồm số nguyên (int), số thực (float), chuỗi (str) và đúng/sai (bool). Phép + có thể cộng số hoặc nối chuỗi tùy kiểu dữ liệu.",
          bullets: ["x = 5 tạo biến x có giá trị 5.", "Tên biến nên gợi ý nghĩa, ví dụ total hoặc score.", "Chú ý kiểu dữ liệu khi so sánh hoặc tính toán."]
        },
        {
          heading: "2. Danh sách và chỉ số",
          body: "Trong Python, chỉ số danh sách bắt đầu từ 0. Với a = [7, 4, 9], a[0] là 7, a[1] là 4. Độ dài danh sách là len(a).",
          example: "a = [2, 5, 8]. Tổng các phần tử là 2 + 5 + 8 = 15. Khi duyệt danh sách, mỗi lần cần xác định đang dùng phần tử nào.",
          takeaway: "Lỗi vượt chỉ số thường xảy ra khi cố truy cập vị trí không tồn tại."
        },
        {
          heading: "3. Hàm",
          body: "Hàm gom một nhóm lệnh để dùng lại. Hàm có thể nhận tham số và trả kết quả bằng return. Khi đọc hàm, tìm đầu vào, phần xử lý và giá trị trả về.",
          bullets: ["print hiển thị; return trả giá trị cho nơi gọi hàm.", "Biến tạo trong hàm thường chỉ dùng trong phạm vi hàm.", "Tách việc lớn thành các hàm nhỏ giúp dễ đọc và kiểm tra."]
        }
      ],
      keywords: ["Python", "danh sách", "biến", "hàm"]
    },
    {
      id: "informatics-data",
      subject: "informatics",
      category: "Dữ liệu số",
      title: "Bảng tính, dữ liệu và thông tin",
      subtitle: "Đọc bảng có hệ thống và kiểm tra đơn vị.",
      minutes: 14,
      level: "Trọng tâm",
      goal: "Phân biệt dữ liệu và thông tin; hiểu cách tổ chức, lọc và trình bày dữ liệu trong bảng tính.",
      sections: [
        {
          heading: "1. Dữ liệu và thông tin",
          body: "Dữ liệu là các giá trị thô. Thông tin là dữ liệu đã được tổ chức hoặc xử lý để giúp trả lời một câu hỏi. Ví dụ, danh sách điểm là dữ liệu; điểm trung bình theo lớp là thông tin tổng hợp.",
          bullets: ["Kiểm tra dữ liệu thiếu hoặc trùng.", "Đọc tên cột và đơn vị.", "Không kết luận từ biểu đồ nếu chưa xem thang đo."]
        },
        {
          heading: "2. Bảng tính",
          body: "Một ô được gọi bằng cột và hàng, ví dụ B3. Công thức thường bắt đầu bằng dấu =. Khi sao chép công thức, tham chiếu tương đối có thể thay đổi theo vị trí.",
          example: "Nếu B2 = 4, B3 = 6 thì =SUM(B2:B3) cho kết quả 10.",
          takeaway: "Kiểm tra phạm vi dữ liệu trong công thức trước khi tin vào kết quả."
        },
        {
          heading: "3. Bảo vệ dữ liệu cá nhân",
          body: "Chỉ thu thập dữ liệu cần thiết, xin phép trước khi chia sẻ và ẩn thông tin nhạy cảm trong ảnh chụp màn hình. Bảng điểm có tên đầy đủ hoặc số điện thoại không nên đăng công khai.",
          bullets: ["Dùng mật khẩu riêng cho từng dịch vụ.", "Bật xác thực nhiều bước nếu có.", "Kiểm tra quyền truy cập trước khi chia sẻ tệp."]
        }
      ],
      keywords: ["dữ liệu", "bảng tính", "công thức", "quyền riêng tư"]
    },
    {
      id: "informatics-safety",
      subject: "informatics",
      category: "An toàn số",
      title: "An toàn số và dấu hiệu lừa đảo",
      subtitle: "Dừng lại, xác minh, rồi mới bấm vào liên kết.",
      minutes: 13,
      level: "Ứng dụng",
      goal: "Nhận ra dấu hiệu tin nhắn giả mạo, bảo vệ tài khoản và ứng xử có trách nhiệm trên mạng.",
      sections: [
        {
          heading: "1. Ba dấu hiệu cần cảnh giác",
          body: "Tin nhắn thúc ép làm ngay, hứa phần thưởng khó tin, hoặc yêu cầu mật khẩu/mã OTP thường có rủi ro. Địa chỉ người gửi có thể gần giống tên thật nhưng thừa ký tự.",
          bullets: ["Không gửi mã OTP cho bất kỳ ai.", "Tự mở trang chính thức thay vì bấm liên kết lạ.", "Hỏi người lớn hoặc đơn vị liên quan qua kênh đã biết."]
        },
        {
          heading: "2. Bảo vệ tài khoản",
          body: "Dùng mật khẩu dài, khó đoán và khác nhau giữa các dịch vụ. Bật xác thực hai bước để giảm rủi ro nếu mật khẩu bị lộ.",
          example: "Nếu nhận tin “Tài khoản sẽ khóa trong 5 phút, gửi mã OTP để mở lại”, hãy dừng lại và liên hệ dịch vụ qua ứng dụng hoặc website chính thức.",
          takeaway: "Mã OTP là chìa khóa tạm thời; không chia sẻ qua tin nhắn hay cuộc gọi."
        },
        {
          heading: "3. Ứng xử có trách nhiệm",
          body: "Tôn trọng quyền riêng tư và bản quyền; kiểm tra nguồn trước khi chia sẻ. Khi dùng công cụ AI, cần kiểm chứng thông tin và không nhập dữ liệu cá nhân nhạy cảm.",
          bullets: ["Nêu nguồn khi sử dụng nội dung của người khác.", "Không đăng ảnh/thông tin của bạn bè khi chưa được đồng ý.", "Báo người lớn khi gặp nội dung đe dọa hoặc lừa đảo."]
        }
      ],
      keywords: ["an toàn số", "mật khẩu", "OTP", "AI", "quyền riêng tư"]
    }
  ],
  tests: [
    {
      id: "test-math",
      subject: "math",
      title: "Toán · 6 câu luyện nhanh",
      subtitle: "Đạo hàm, logarit, tích phân và xác suất.",
      duration: 12,
      kind: "quiz",
      items: [
        {
          type: "mcq",
          prompt: "Cho f(x) = x² − 6x + 5. Hàm số đạt cực tiểu tại x bằng bao nhiêu?",
          options: ["1", "2", "3", "6"],
          answer: 2,
          explanation: "f′(x) = 2x − 6 = 0 khi x = 3. Đạo hàm đổi từ âm sang dương, nên x = 3 là điểm cực tiểu."
        },
        {
          type: "mcq",
          prompt: "Điều kiện xác định của log₃(2x − 1) là gì?",
          options: ["x < 1/2", "x ≥ 1/2", "x > 1/2", "Mọi số thực"],
          answer: 2,
          explanation: "Biểu thức trong logarit phải dương: 2x − 1 > 0, suy ra x > 1/2."
        },
        {
          type: "short",
          prompt: "Tính ∫₀² 2x dx. Nhập kết quả bằng số.",
          answers: ["4", "4.0", "4,0"],
          explanation: "Một nguyên hàm của 2x là x². Thay cận: 2² − 0² = 4."
        },
        {
          type: "tf",
          prompt: "Đánh dấu đúng hoặc sai cho từng nhận định.",
          statements: [
            { text: "Nếu f′(x) > 0 trên một khoảng thì f tăng trên khoảng đó.", answer: true },
            { text: "logₐx xác định với mọi x nếu a > 0 và a ≠ 1.", answer: false },
            { text: "Xác suất của một biến cố luôn nằm trong đoạn [0; 1].", answer: true }
          ],
          explanation: "Đạo hàm dương cho biết hàm tăng. Logarit còn cần x > 0. Xác suất luôn từ 0 đến 1."
        },
        {
          type: "mcq",
          prompt: "Hộp có 3 bi đỏ và 2 bi xanh. Lấy ngẫu nhiên 1 viên. Xác suất lấy bi đỏ là:",
          options: ["2/5", "3/5", "1/2", "3/2"],
          answer: 1,
          explanation: "Có 3 kết quả thuận lợi trên tổng 5 viên, nên xác suất là 3/5."
        },
        {
          type: "short",
          prompt: "Một nguyên hàm của f(x) = 3x² là F(x) = xⁿ. n bằng bao nhiêu?",
          answers: ["3"],
          explanation: "F(x) = x³ vì (x³)′ = 3x², vậy n = 3."
        }
      ]
    },
    {
      id: "test-literature",
      subject: "literature",
      title: "Ngữ văn · bài viết 25 phút",
      subtitle: "Đọc một đoạn văn mới, viết đoạn nghị luận ngắn.",
      duration: 25,
      kind: "essay",
      passage: "Buổi sáng, con hẻm nhỏ còn ướt mưa. Bà cụ bán xôi đặt chiếc ghế nhựa sát mái hiên, nhường phần khô ráo cho cậu học trò đang loay hoay che quyển vở. Cậu khẽ cảm ơn. Bà chỉ cười: “Mưa rồi sẽ tạnh, cứ đi học cho kịp con nhé.” Con hẻm vẫn còn những vũng nước, nhưng bước chân cậu bỗng nhẹ hơn.",
      prompt: "Từ đoạn văn trên, hãy viết một đoạn khoảng 180–220 chữ trình bày suy nghĩ về ý nghĩa của những hành động tử tế nhỏ trong đời sống.",
      rubric: [
        { label: "Nêu đúng vấn đề và có ý kiến rõ ràng", points: 2 },
        { label: "Giải thích, bàn luận có lý lẽ phù hợp", points: 3 },
        { label: "Có ví dụ hoặc liên hệ cụ thể, đúng chủ đề", points: 2 },
        { label: "Bố cục mạch lạc, dùng từ và viết câu rõ", points: 2 },
        { label: "Có bài học/hành động thiết thực", points: 1 }
      ],
      sampleOutline: [
        "Mở đoạn: việc tử tế không nhất thiết phải lớn lao.",
        "Bàn luận: giúp người khác cảm thấy được quan tâm; tạo niềm tin và lan tỏa điều tốt.",
        "Ví dụ: nhường chỗ, chỉ đường, chia sẻ tài liệu học tập; giải thích tác động của hành động.",
        "Mở rộng: tử tế cần chân thành, tôn trọng ranh giới và không phô trương.",
        "Kết đoạn: chọn một việc nhỏ mình có thể làm mỗi ngày."
      ]
    },
    {
      id: "test-english",
      subject: "english",
      title: "Tiếng Anh · 6 câu luyện nhanh",
      subtitle: "Ngữ pháp, từ vựng theo ngữ cảnh và đọc hiểu.",
      duration: 10,
      kind: "quiz",
      items: [
        {
          type: "mcq",
          prompt: "My sister _____ in Da Nang since 2022.",
          options: ["lives", "lived", "has lived", "is living"],
          answer: 2,
          explanation: "Since 2022 diễn tả khoảng thời gian bắt đầu trong quá khứ và còn liên quan hiện tại; dùng hiện tại hoàn thành."
        },
        {
          type: "mcq",
          prompt: "The book _____ by many students last year.",
          options: ["reads", "was read", "is reading", "has read"],
          answer: 1,
          explanation: "Chủ ngữ the book nhận hành động và có mốc last year, nên dùng bị động quá khứ đơn: was read."
        },
        {
          type: "mcq",
          prompt: "If it _____ tomorrow, we will study at home.",
          options: ["rains", "will rain", "rained", "is raining"],
          answer: 0,
          explanation: "Câu điều kiện loại 1 thường dùng If + hiện tại đơn, will + động từ nguyên mẫu."
        },
        {
          type: "mcq",
          prompt: "Choose the best word: Please _____ a decision before Friday.",
          options: ["do", "make", "take", "give"],
          answer: 1,
          explanation: "Collocation thông dụng là make a decision."
        },
        {
          type: "mcq",
          prompt: "The road was slippery, so we walked _____.",
          options: ["careful", "carefully", "carefulness", "care"],
          answer: 1,
          explanation: "Cần trạng từ bổ nghĩa cho động từ walked, nên chọn carefully."
        },
        {
          type: "tf",
          prompt: "Đánh dấu đúng hoặc sai cho từng nhận định.",
          statements: [
            { text: "However thường dùng để giới thiệu ý tương phản.", answer: true },
            { text: "Who thường thay cho người trong mệnh đề quan hệ.", answer: true },
            { text: "Therefore thường dùng để nêu nguyên nhân đứng trước kết quả.", answer: false }
          ],
          explanation: "However thể hiện đối lập; who thường thay người; therefore nêu kết quả, không phải nguyên nhân."
        }
      ]
    },
    {
      id: "test-informatics",
      subject: "informatics",
      title: "Tin học · 6 câu luyện nhanh",
      subtitle: "Thuật toán, Python, dữ liệu và an toàn số.",
      duration: 10,
      kind: "quiz",
      items: [
        {
          type: "mcq",
          prompt: "Trong thuật toán, dữ liệu đưa vào để xử lý được gọi là gì?",
          options: ["Output", "Input", "Comment", "Loop"],
          answer: 1,
          explanation: "Input là dữ liệu đầu vào; output là kết quả đầu ra."
        },
        {
          type: "mcq",
          prompt: "Với a = [7, 4, 9] trong Python, giá trị của a[0] là:",
          options: ["7", "4", "9", "0"],
          answer: 0,
          explanation: "Chỉ số của danh sách Python bắt đầu từ 0, nên a[0] là phần tử đầu tiên: 7."
        },
        {
          type: "short",
          prompt: "Bảng tính có B2 = 4 và B3 = 6. Công thức =SUM(B2:B3) trả về bao nhiêu?",
          answers: ["10", "10.0", "10,0"],
          explanation: "SUM cộng các ô trong vùng B2 đến B3: 4 + 6 = 10."
        },
        {
          type: "tf",
          prompt: "Đánh dấu đúng hoặc sai cho từng nhận định.",
          statements: [
            { text: "Vòng lặp cần có điều kiện dừng phù hợp.", answer: true },
            { text: "Có thể chia sẻ mã OTP nếu người gọi nói là nhân viên ngân hàng.", answer: false },
            { text: "Dữ liệu thiếu hoặc trùng có thể làm sai kết luận.", answer: true }
          ],
          explanation: "Vòng lặp phải dừng; không chia sẻ OTP; dữ liệu lỗi ảnh hưởng kết quả phân tích."
        },
        {
          type: "mcq",
          prompt: "Trong Python, từ khóa thường dùng để trả kết quả từ một hàm là:",
          options: ["print", "return", "input", "while"],
          answer: 1,
          explanation: "return trả một giá trị về nơi gọi hàm. print chủ yếu hiển thị nội dung ra màn hình."
        },
        {
          type: "mcq",
          prompt: "Nhận tin nhắn yêu cầu gửi mã OTP gấp để tránh khóa tài khoản. Nên làm gì trước tiên?",
          options: ["Gửi mã để giữ tài khoản", "Bấm liên kết trong tin nhắn", "Dừng lại và xác minh qua kênh chính thức", "Chuyển tiếp cho bạn bè"],
          answer: 2,
          explanation: "Không chia sẻ OTP hoặc bấm liên kết lạ. Hãy tự mở ứng dụng/website chính thức để xác minh."
        }
      ]
    }
  ],
  sources: [
    {
      label: "Cấu trúc, định dạng đề thi từ năm 2025",
      detail: "Cục Quản lý chất lượng – Bộ GDĐT; thời gian làm bài và dạng thức theo công bố chính thức.",
      url: "https://vqa.moet.gov.vn/vi/news/thong-bao/cau-truc-dinh-dang-de-thi-tot-nghiep-thpt-tu-nam-2025-74.html"
    },
    {
      label: "Đề thi tham khảo từ năm 2025",
      detail: "18 đề tham khảo theo Chương trình GDPT 2018 do Bộ GDĐT công bố.",
      url: "https://vqa.moet.gov.vn/vi/news/tin-tuc-su-kien/de-thi-tham-khao-ky-thi-tot-nghiep-thpt-tu-nam-2025-159.html"
    },
    {
      label: "Đáp án kỳ thi tốt nghiệp THPT 2025",
      detail: "Trang công bố đáp án chính thức; dùng để đối chiếu sau khi tự làm đề.",
      url: "https://vqa.moet.gov.vn/vi/news/tin-tuc-su-kien/cong-bo-dap-an-cac-mon-thi-cua-ky-thi-tot-nghiep-thpt-2025-208.html"
    },
    {
      label: "Thông tin về kỳ thi tốt nghiệp THPT 2026",
      detail: "Bộ GDĐT thông tin năm 2026 không công bố đề minh họa mới; định dạng và tỉ lệ tư duy theo năm 2025.",
      url: "https://moet.gov.vn/tin-tuc/tin-tong-hop2/khong-cong-bo-de-minh-hoa-ki-thi-tot-nghiep-trung-hoc-pho-thong-nam-2026.html"
    },
    {
      label: "Hướng dẫn tổ chức kỳ thi năm 2026",
      detail: "Lịch và thời lượng bài thi năm 2026 do Bộ GDĐT hướng dẫn.",
      url: "https://moet.gov.vn/tin-tuc/tin-tong-hop2/bo-gddt-ban-hanh-huong-dan-to-chuc-ki-thi-tot-nghiep-thpt-nam-2026.html"
    }
  ]
};
