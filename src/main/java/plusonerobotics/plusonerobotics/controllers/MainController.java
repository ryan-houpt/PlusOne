package plusonerobotics.plusonerobotics.controllers;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import plusonerobotics.plusonerobotics.models.BinanceUser;
import plusonerobotics.plusonerobotics.models.Mobile;
import static com.binance.api.client.domain.account.NewOrder.marketBuy;
import static com.binance.api.client.domain.account.NewOrder.marketSell;


@Controller
public class MainController {

    @GetMapping("/")
    public String home(Model model) {

        model.addAttribute("BTC", BinanceUser.getUser().getAccount().getAssetBalance("BTC").getFree());

        return "system/home";
    }

    @PostMapping("buy/{pair}")
    public String buy100(@PathVariable String pair) {

        String message = "You bought " + pair;

        BinanceUser.getUser().newOrder(marketBuy(pair, "2"));
        Mobile.sendText(message);
        return "redirect:/";
    }


    @PostMapping("sell/{pair}")
    public String sell(@PathVariable String pair) {

        String message = "You sold " + pair;

        BinanceUser.getUser().newOrder(marketSell(pair, "2"));
        Mobile.sendText(message);

        return "redirect:/";
    }

}
